import "dotenv/config";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, "../../../swagger.yml"));

if (process.env.NODE_ENV !== "production") {
  router.use(
    "/",
    (req, res, next) => {
      swaggerDocument.info.title = process.env.APP_NAME;
      swaggerDocument.info.version = "1.0";
      swaggerDocument.servers = [
        {
          url: `${process.env.APP_URL}/api`,
          description: "API base url",
        },
      ];
      req.swaggerDoc = swaggerDocument;
      next();
    },
    serve,
    setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

export default router;
