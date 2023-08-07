import { DataTypes } from "sequelize";

import DBHelper from "../src/common/helpers/database.helper";

const RefreshToken = DBHelper.define("refresh_tokens", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  accessTokenId: {
    type: DataTypes.STRING,
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    default: null,
  },
});

export default RefreshToken;
