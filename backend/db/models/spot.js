'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      }),

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      }),

      Spot.hasMany(models.SpotImage, { //Spot -> one to many -> SpotImages
        foreignKey: 'spotId'
      }),

      Spot.belongsTo(models.User, { //Spot -> many to one -> User
        foreignKey: 'ownerId',
        as: 'Owner'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },

    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        isFloat: true,
        min: 0
      }
    },

  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
