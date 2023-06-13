'use strict';

const { Spot } = require('../models')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpots = [
  {
    ownerId: 1,
    address: '111 Street',
    city: 'Springfield',
    state: 'IL',
    country: 'USA',
    lat: 39.797519,
    lng: -89.646184,
    name: 'Springfield Home',
    description: 'Come out to springy Springfield!',
    price: 1045.39,
  },
  {
    ownerId: 2,
    address: '222 Street',
    city: 'Boulder',
    state: 'CO',
    country: 'USA',
    lat: 40.014984,
    lng: -105.270546,
    name: 'Boulder Home',
    description: 'Enjoy some beautiful Boulder!',
    price: 3038.48,
  },
  {
    ownerId: 3,
    address: '333 Street',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    lat: 47.606209,
    lng: -122.332069,
    name: 'Seattle Home',
    description: 'Lets sample some of Seattle!',
    price: 9375.24,
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
      // options.tableName = 'Spots' //not necessary for bulkCreate
      await Spot.bulkCreate(demoSpots, {
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
    for (let spotInfo of demoSpots) {
      try {
        // options.tableName = 'Spots'//not necessary for bulkCreate
        await Spot.destroy({
          where: spotInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
