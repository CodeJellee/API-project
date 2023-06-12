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
      Review.belongsToMany(models.User, { //M2M via Reviews join table
        through: models.Review,
        foreignKey: 'spotId',
        otherKey: 'userId'
      })

      Review.belongsTo(models.ReviewImage, { //Review -> one to many -> ReviewImage
        foreignKey: 'reviewId'
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
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
