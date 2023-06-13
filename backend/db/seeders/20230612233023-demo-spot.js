'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: '1',
        address: '111 Street',
        city: 'Springfield',
        state: 'Illinois',
        country: 'USA',
        lat: '39.797519',
        lng: '-89.646184',
        name: 'Springfield Home',
        description: 'Come out to springy Springfield!',
        price: '1045.39',
      },
      {
        ownerId: '2',
        address: '222 Street',
        city: 'Boulder',
        state: 'Colorado',
        country: 'USA',
        lat: '40.014984',
        lng: '-105.270546',
        name: 'Boulder Home',
        description: 'Enjoy some beautiful Boulder!',
        price: '3038.48',
      },
      {
        ownerId: '3',
        address: '333 Street',
        city: 'Seattle',
        state: 'Washington',
        country: 'USA',
        lat: '47.606209',
        lng: '-122.332069',
        name: 'Seattle Home',
        description: 'Lets sample some of Seattle!',
        price: '9375.24',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['Springfield', 'Boulder', 'Seattle'] }
    }, {});
  }
};
