"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileUser.belongsTo(models.User, { foreignKey: "UserId" });
    }
    formatDate () {
      return this.dateOfBirth.toISOString().substring(0, 10);
    }
  }
  ProfileUser.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required!" },
          notNull: { msg: "Name is required!" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Gender is required!" },
          notNull: { msg: "Gender is required!" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Adrress is required!" },
          notNull: { msg: "Adrress is required!" },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Date Of Birth is required!" },
          notNull: { msg: "Date Of Birth is required!" },
        },
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Telephone is required!" },
          notNull: { msg: "Telephone is required!" },
        },
      },
      profilePicture: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Profile Picture is required!" },
          notNull: { msg: "Profile Picture is required!" },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProfileUser",
    }
  );
  return ProfileUser;
};
