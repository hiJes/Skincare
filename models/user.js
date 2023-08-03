"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.ProfileUser, { foreignKey: "UserId" });
      User.hasMany(models.Transaction, { foreignKey: "TransactionId" });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required!" },
          notNull: { msg: "Username is required!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required!" },
          notNull: { msg: "Email is required!" },
          isEmail: { msg: "Invalid email!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required!" },
          notNull: { msg: "Password is required!" },
          len: {
            args: [2, 15],
            msg: "Must be 8 - 15 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Role is required!" },
          notNull: { msg: "Role is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeSave((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });
  return User;
};
