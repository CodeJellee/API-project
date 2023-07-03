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
    state: 'Illinois',
    country: 'United States of America',
    lat: 39.7975,
    lng: -89.6461,
    name: 'Springfield Home',
    description: 'Come out to springy Springfield!',
    price: 1045.39,
  },
  {
    ownerId: 2,
    address: '222 Street',
    city: 'Boulder',
    state: 'Colorado',
    country: 'United States of America',
    lat: 40.0149,
    lng: -105.2705,
    name: 'Boulder Home',
    description: 'Enjoy some beautiful Boulder!',
    price: 3038.48,
  },
  {
    ownerId: 3,
    address: '333 Street',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States of America',
    lat: 47.6062,
    lng: -122.3320,
    name: 'Seattle Home',
    description: 'Lets sample some of Seattle!',
    price: 9375.24,
  },
  {
    ownerId: 1,
    address: '123 Main St',
    city: 'New York City',
    state: 'New York',
    country: 'United States of America',
    lat: 40.7128,
    lng: -74.0060,
    name: 'Cozy Apartment',
    description: 'A cozy apartment in the heart of New York City.',
    price: 100.00,
  },
  {
    ownerId: 2,
    address: '456 Elm St',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States of America',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Luxury Villa',
    description: 'A luxurious villa with stunning views in Los Angeles.',
    price: 200.00,
  },
  {
    ownerId: 3,
    address: '789 Oak St',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States of America',
    lat: 41.8781,
    lng: -87.6298,
    name: 'Charming Cottage',
    description: 'A charming cottage nestled in the Chicago suburbs.',
    price: 150.00,
  },
  {
    ownerId: 1,
    address: '321 Pine St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Modern Loft',
    description: 'A modern loft in the heart of San Francisco.',
    price: 180.00,
  },
  {
    ownerId: 2,
    address: '654 Cedar St',
    city: 'Miami',
    state: 'Florida',
    country: 'United States of America',
    lat: 25.7617,
    lng: -80.1918,
    name: 'Beachfront Condo',
    description: 'A beautiful beachfront condo in Miami.',
    price: 220.00,
  },
  {
    ownerId: 3,
    address: '987 Maple St',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States of America',
    lat: 47.6062,
    lng: -122.3321,
    name: 'Spacious Townhouse',
    description: 'A spacious townhouse in the heart of Seattle.',
    price: 160.00,
  },
  {
    ownerId: 1,
    address: '741 Oak St',
    city: 'Boston',
    state: 'Massachusetts',
    country: 'United States of America',
    lat: 42.3601,
    lng: -71.0589,
    name: 'Historic Brownstone',
    description: 'A historic brownstone in the heart of Boston.',
    price: 190.00,
  },
  {
    ownerId: 2,
    address: '852 Elm St',
    city: 'Austin',
    state: 'Texas',
    country: 'United States of America',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Urban Loft',
    description: 'An urban loft with a trendy vibe in Austin.',
    price: 170.00,
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
