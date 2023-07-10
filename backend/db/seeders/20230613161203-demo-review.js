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
    userId: 2,
    review: 'Beautiful but meh.',
    stars: 2
  },
  {
    spotId: 1,
    userId: 3,
    review: 'Stunning place',
    stars: 5
  },
  {
    spotId: 2,
    userId: 1,
    review: 'Such a rainy place here.',
    stars: 3
  },
  {
    spotId: 2,
    userId: 3,
    review: 'Beautiful but meh.',
    stars: 2
  },
  {
    spotId: 3,
    userId: 1,
    review: 'Stunning place',
    stars: 5
  },
  {
    spotId: 4,
    userId: 2,
    review: 'Such a rainy place here.',
    stars: 3
  },
  {
    spotId: 5,
    userId: 1,
    review: 'Would recommend to family and friends!',
    stars: 2
  },
  {
    spotId: 5,
    userId: 3,
    review: 'Stunning place',
    stars: 5
  },
  {
    spotId: 8,
    userId: 3,
    review: 'Such a rainy place here.',
    stars: 3
  },
  {
    spotId: 10,
    userId: 2,
    review: 'Super sunny all day every day while we were here!',
    stars: 2
  },
  {
    spotId: 11,
    userId: 1,
    review: 'Stunning rental unit!',
    stars: 5
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
      // options.tableName = 'Reviews'
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
        // options.tableName = 'Reviews'
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
