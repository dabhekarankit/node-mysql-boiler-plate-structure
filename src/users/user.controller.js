import UserResource from "./user.resource";
import UserService from "./user.service";
const userService = new UserService();

class UserController {
  /**
   * user register
   * @param {object} req
   * @param {object} res
   */
  async register(req, res) {
    const user = await userService.register(req.body, req.files);

    const authentication = await userService.generateTokenPairs(
      user.id,
      user.email
    );
    delete user.dataValues.password;
    return res.json({
      data: { ...new UserResource(user.dataValues), authentication },
    });
  }

  /**
   * user login
   * @param {object} req
   * @param {object} res
   */
  async login(req, res) {
    const user = await userService.login(req.body);

    const authentication = await userService.generateTokenPairs(
      user.id,
      user.email
    );

    return res.json({
      data: { ...new UserResource(user.dataValues), authentication },
    });
  }

  async show(req, res) {
    return res.json({ data: new UserResource(req.user) });
  }
}

export default UserController;
