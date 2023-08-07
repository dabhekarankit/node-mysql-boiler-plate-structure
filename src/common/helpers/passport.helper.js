import "dotenv/config";

import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import moment from "moment";
import AccessToken from "../../../models/access-token.model";
import User from "../../../models/user.model";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_KEY,
};

passport.use(
  // JWT strategy for check login user
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      if (moment.utc().unix() > jwtPayload.exp) {
        return done(null, false);
      }

      const accessToken = await AccessToken.findOne(
        {
          where: { id: jwtPayload.jti, userId: jwtPayload.sub, revoked: null },
          include: User,
        },
        { raw: null }
      );

      if (
        !accessToken ||
        moment.utc().unix() > moment.unix(accessToken.dataValues.expiresAt)
      ) {
        return done("Unauthorized", false);
      }

      const user = accessToken.dataValues.user.dataValues;
      user.id = jwtPayload.sub;
      user.jti = jwtPayload.jti;

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
