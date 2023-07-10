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
    spotId: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/6T4A9446-HDR-3.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/6T4A9446-HDR-3.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/6T4A9446-HDR-3.jpg',
    preview: true
  },
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
    spotId: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Flatirons_Winter_Sunrise_edit_2.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Flatirons_Winter_Sunrise_edit_2.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Flatirons_Winter_Sunrise_edit_2.jpg',
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
    preview: true
  },
  {
    spotId: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Seattle_Center_as_night_falls.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Statuephoto135790.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/800px-Hollywood_Sign_%28Zuschnitt%29.jpg',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Wrigley_Field_in_line_with_home_plate.jpg/800px-Wrigley_Field_in_line_with_home_plate.jpg',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/San_Francisco_from_the_Marin_Headlands_in_August_2022.jpg/800px-San_Francisco_from_the_Marin_Headlands_in_August_2022.jpg',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Villa_Vizcaya_20110228.jpg/1024px-Villa_Vizcaya_20110228.jpg',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Seattle_Center_as_night_falls.jpg/800px-Seattle_Center_as_night_falls.jpg',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/ISH_WC_Boston4.jpg/800px-ISH_WC_Boston4.jpg',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Memorial_Stadium_Pregame.JPG/800px-Memorial_Stadium_Pregame.JPG',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/103_Hanover.jpg/1920px-103_Hanover.jpg',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/9%2C_Strada_Mitropolit_Nifon%2C_Bucharest_%28Romania%29.jpg/1920px-9%2C_Strada_Mitropolit_Nifon%2C_Bucharest_%28Romania%29.jpg',
    preview: true
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
      // options.tableName = 'SpotImages'
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
        // options.tableName = 'SpotImages'
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
