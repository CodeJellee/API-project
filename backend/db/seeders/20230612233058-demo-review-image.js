'use strict';

const { ReviewImage } = require('../models')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviewImages = [
  {
    reviewId: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/6T4A9446-HDR-3.jpg'
  },
  {
    reviewId: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Flatirons_Winter_Sunrise_edit_2.jpg'
  },
  {
    reviewId: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg'
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
      await ReviewImage.bulkCreate(demoReviewImages, {
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
    for (let reviewImagesInfo of demoReviewImages) {
      try {
        await ReviewImage.destroy({
          where: reviewImagesInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
