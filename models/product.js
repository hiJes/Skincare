"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsToMany(models.Transaction,  { through: models.TransactionProduct });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required!"
          },
          notNull: {
            msg: "Name is required!"
          }
        }
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Brand is required!"
          },
          notNull: {
            msg: "Brand is required!"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required!"
          },
          notNull: {
            msg: "Description is required!"
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required!"
          },
          notNull: {
            msg: "Price is required!"
          },
          min: {
            args: [1],
            msg: "Price must be greater than 0"
          }
        }
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "URL photo is required!"
          },
          notNull: {
            msg: "URL photo is required!"
          }
        }
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category is required!"
          },
          notNull: {
            msg: "Category is required!"
          }
        }
      },
      stock : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock is required!"
          },
          notNull: {
            msg: "Stock is required!"
          },
          min: {
            args: [1],
            msg: "Minimum stock is 1"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
