import jwt from "jsonwebtoken";
import moment from "moment";
import { randomBytes } from "crypto";
import AccessToken from "../../models/access-token.model";

class AccessTokensService {
  /**
   * Generates access tokens
   * @param {number} userId
   * @param {string} email
   */
  async createToken(userId, email) {
    const jti = randomBytes(32).toString("hex");

    const jwtToken = jwt.sign(
      {
        sub: userId,
        jti,
        email,
      },
      process.env.APP_KEY,
      {
        expiresIn: "365 days",
      }
    );

    const decodedJwtToken = jwt.decode(jwtToken);

    // save
    await this.store(jti, userId, decodedJwtToken);

    return jwtToken;
  }

  /**
   * Save token in db
   * @param {string} jti
   * @param {number} userId
   * @param {object} decodedJwtToken
   *
   */
  async store(jti, userId, decodedJwtToken) {
    return await AccessToken.create(
      {
        id: jti,
        userId,
        expiresAt: moment.unix(decodedJwtToken.exp).format("YYYY-MM-DD"),
      },
      { raw: true }
    );
  }
}

export default new AccessTokensService();
