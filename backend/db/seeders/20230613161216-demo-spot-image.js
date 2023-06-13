'use strict';

const { SpotImage } = require('../models')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpotImages = [
  {
    spotId: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/6T4A9446-HDR-3.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Flatirons_Winter_Sunrise_edit_2.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg',
    preview: false
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
      await SpotImage.bulkCreate(demoSpotImages, {
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

    for (let spotImagesInfo of demoSpotImages) {
      try {
        await SpotImage.destroy({
          where: spotImagesInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};