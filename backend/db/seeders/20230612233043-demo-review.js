'use strict';

const { Review } = require('../models')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviews = [
  {
    spotId: 1,
    userId: 1,
    review: 'Beautiful Springfield but meh.',
    stars: 2
  },
  {
    spotId: 2,
    userId: 2,
    review: 'Stunning Boulder',
    stars: 5
  },
  {
    spotId: 3,
    userId: 3,
    review: 'Such a rainy place here.',
    stars: 3
  }

]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    try {
      await Review.bulkCreate(demoReviews, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    for (let reviewsInfo of demoReviews) {
      try {
        await Review.destroy({
          where: reviewsInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
