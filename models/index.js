import DBHelper from "../src/common/helpers/database.helper";
import AccessToken from "./access-token.model";
import RefreshToken from "./refresh-token.model";
import User from "./user.model";

const db = {};
db.sequelize = DBHelper;

// user -access_token
AccessToken.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
});

User.hasMany(AccessToken, {
  foreignKey: "userId",
  onDelete: "cascade",
});

// access_token -refresh_token
RefreshToken.belongsTo(AccessToken, {
  foreignKey: "accessTokenId",
  onDelete: "cascade",
});

AccessToken.hasMany(RefreshToken, {
  foreignKey: "accessTokenId",
  onDelete: "CASCADE",
});

export default db;
