import moment from "moment";
import { randomBytes } from "crypto";
import RefreshToken from "../../models/refresh-token.model";
import { encrypt } from "../common/helpers/common.helper";

class RefreshTokensService {
  /**
   * Create refresh token
   * @param {string} jti
   * @param {string} expiresAt
   *
   * @return {Promise<string>} refresh token
   */
  async createToken(jti, expiresAt) {
    const id = randomBytes(32).toString("hex");

    await RefreshToken.create(
      {
        id,
        accessTokenId: jti,
        expiresAt: moment
          .unix(expiresAt)
          .add("21 days")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      { raw: true }
    );

    return encrypt(id);
  }
}

export default new RefreshTokensService();
