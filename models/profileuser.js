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
  }
  ProfileUser.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      addres: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      telephone: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProfileUser",
    }
  );
  return ProfileUser;
};
