import moment from "moment";
import { decode } from "jsonwebtoken";
import User from "../../models/user.model";
import accessTokensService from "../access-tokens/access-tokens.service";
import refreshTokensService from "../refresh-tokens/refresh-tokens.service";
import ConflictRequestException from "../common/exceptions/conflict-request.exception";
import { compareString, encodeString } from "../common/helpers/bcrypt.helper";
import UnauthorizedException from "../common/exceptions/unauthorized.exception";

class UserService {
  /**
   * register user
   * @param {object} body
   * @returns
   */
  async register(body) {
    const checkEmail = await User.findOne({ where: { email: body.email } });
    if (checkEmail) {
      throw new ConflictRequestException(
        "An account already exists with this email address."
      );
    }

    return await User.create(
      {
        ...body,
        verifiedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        password: encodeString(body.password),
      },
      { plain: true }
    );
  }

  /**
   * Login user
   * @param {object} body
   * @returns
   */
  async login(body) {
    const user = await User.findOne({ where: { email: body.email } });

    if (!user || !compareString(body.password, user.password)) {
      throw new UnauthorizedException("Invalid email or password combination.");
    }

    return user;
  }

  /**
   * Generate access token & refresh token
   * @param {number} userId
   * @param {string} email
   */
  async generateTokenPairs(userId, email) {
    const accessToken = await accessTokensService.createToken(userId, email);

    const decodedToken = decode(accessToken);

    const refreshToken = await refreshTokensService.createToken(
      decodedToken.jti,
      decodedToken.exp
    );

    return {
      accessToken,
      refreshToken,
      expireAt: decodedToken.exp,
    };
  }
}

export default UserService;
