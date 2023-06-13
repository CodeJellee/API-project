'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Review.hasMany(models.ReviewImage, { //Review -> one to many -> ReviewImage
        foreignKey: 'reviewId'
      }),

      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      }),

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    review: {
      type: DataTypes.STRING,
      allowNull: false
    },

    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        min: 0,
        max: 5
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
