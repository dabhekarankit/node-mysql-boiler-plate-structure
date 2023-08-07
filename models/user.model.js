import { DataTypes } from "sequelize";
import DBHelper from "../src/common/helpers/database.helper";

const User = DBHelper.define("users", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verifiedAt: {
    type: DataTypes.DATE,
    default: null,
  },
});

export default User;
