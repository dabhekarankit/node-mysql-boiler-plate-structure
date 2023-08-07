import "dotenv/config";
import express from "express";
import path from "path";
import { Server } from "https";
import fs from "fs";
import modelsAllRelations from "./models";
import "./src/common/helpers/passport.helper";
import swaggerHelper from "./src/common/helpers/swagger.helper";
import routes from "./routes";
import errorHandlerMiddleware from "./src/common/middleware/error-handler.middleware";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1", routes);
app.use("/api/documentation", swaggerHelper);
app.use(errorHandlerMiddleware);

modelsAllRelations.sequelize
  .sync({ alter: true })
  .then(() => {
    if (process.env.IS_SECURE === "true") {
      // SSL certificate path
      var options = {
        key: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`),
        cert: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
        ca: [
          fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
          fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`),
        ],
      };

      const https = Server(options, app);

      https.listen(process.env.PORT, () => {
        console.log(`Listening on (HTTPS) ${process.env.APP_URL}`);
      });
    } else {
      app.listen(process.env.PORT, () => {
        console.log(`Listening on (HTTP) ${process.env.APP_URL}`);
      });
    }
  })
  .catch((err) => console.log(err));
