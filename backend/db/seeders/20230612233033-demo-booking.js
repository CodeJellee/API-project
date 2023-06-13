'use strict';

const { Booking } = require('../models')

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoBookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: '2011-01-01',
    endDate: '2011-01-10',
  },
  {
    spotId: 2,
    userId: 2,
    startDate: '2022-02-02',
    endDate: '2022-02-20',
  },
  {
    spotId: 3,
    userId: 3,
    startDate: '2003-03-03',
    endDate: '2003-03-30',
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
      await Booking.bulkCreate(demoBookings, {
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
    for (let bookingsInfo of demoBookings) {
      try {
        await Booking.destroy({
          where: bookingsInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

  }
};
