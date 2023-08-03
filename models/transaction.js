"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
      Transaction.hasMany(models.TransactionProduct, { foreignKey: "TransactionId" });
    }
  }
  Transaction.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};