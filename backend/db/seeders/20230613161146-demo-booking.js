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
    startDate: '2023-05-01',
    endDate: '2023-07-10',
  },
  {
    spotId: 1,
    userId: 1,
    startDate: '1999-05-01',
    endDate: '1999-07-10',
  },
  {
    spotId: 1,
    userId: 1,
    startDate: '2026-05-01',
    endDate: '2026-07-10',
  },
  {
    spotId: 2,
    userId: 2,
    startDate: '2023-07-02',
    endDate: '2023-07-20',
  },
  {
    spotId: 3,
    userId: 3,
    startDate: '2000-03-03',
    endDate: '2000-03-30',
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
      // options.tableName = 'Bookings'
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
        // options.tableName = 'Bookings'
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
