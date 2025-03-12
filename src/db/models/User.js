import { DataTypes } from "sequelize";
import { emailRegexp, subscribeList } from "../../constants/authVar.js";
import sequelize from "../sequelize.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRegexp,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscribeList,
    defaultValue: subscribeList[0],
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataType.STRING,
    allowNull: true,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// User.sync({alter: true});

export default User;
