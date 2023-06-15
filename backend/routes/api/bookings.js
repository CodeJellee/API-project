// backend/routes/api/bookings.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//GET ALL OF THE CURRENT USERS BOOKINGS
router.get('/current', requireAuth, async(req, res, next) => {
    // const getBookings = await Booking.findAll({
    //     where:
    //     {
    //         userId: req.user.id
    //     },
    //     include: [
    //         {
    //             model: Spot,
    //             attributes: {
    //                 exclude: ['description', 'createdAt', 'updatedAt']
    //             }
    //         }
    //     ]
    // })

    // return res.json(getBookings)


    const allBookings = await Booking.findAll({
        attributes: [
            'id',
            'spotId',
            'userId',
            'startDate',
            'endDate',
            'createdAt',
            'updatedAt'
        ],
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                include: {
                    model: SpotImage,
                    attributes: [['url', "previewImage"]]
                },
                exclude: ['description','createdAt', 'updatedAt']
            }
        ]

    })

//from the 5th video, review again --> maybe theres an easier way, ie use map
    let allBookingJSON = []
    allBookings.forEach(eachBooking => {
        allBookingJSON.push(eachBooking.toJSON())
    });

    allBookingJSON.forEach(eachImage => {
        // console.log(eachImage.Spot)
        // console.log(eachImage.Spot.SpotImages[0].previewImage)
        eachImage.Spot.previewImage = eachImage.Spot.SpotImages[0].previewImage
        delete eachImage.Spot["SpotImages"]
        delete eachImage.Spot["description"]
        delete eachImage.Spot["createdAt"]
        delete eachImage.Spot["updatedAt"]
    })


    res.json({Bookings: allBookingJSON})


})










module.exports = router;
