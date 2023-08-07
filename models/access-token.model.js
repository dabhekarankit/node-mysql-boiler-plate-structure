import { DataTypes } from "sequelize";

import DBHelper from "../src/common/helpers/database.helper";

const AccessToken = DBHelper.define("access_tokens", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.BIGINT,
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

export default AccessToken;
