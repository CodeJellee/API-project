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
//lazy load in lieu of eager
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


});


//EDIT A BOOKING
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    let bookingId = req.params.bookingId
    const { startDate, endDate } = req.body

    const toEdit = await Booking.findByPk(bookingId, {
        include: {
            model: Spot
        }
    })


    if(!toEdit || userId !== toEdit.userId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    let errorsToPrint = {}


    const startDateObj = new Date(startDate)
    const startDateTime = startDateObj.getTime() //changing date into a time where we can check if new date change 'falls within the time range from start to end date of whats already in our booking database"
    const endDateObj = new Date(endDate)
    const endDateTime = endDateObj.getTime()
    const currentDate = new Date()
    const currentDateTime = currentDate.getTime()

    if(startDateTime > endDateTime) {
        errorsToPrint.endDate = "endDate cannot come before startDate"
    }


    const currentBooking = toEdit.endDate
    const currentBookingDate = new Date(currentBooking)
    const currentBookingEndDateTime = currentBookingDate.getTime()

    if(currentDateTime >= currentBookingEndDateTime) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    }


    let errorsBookingConflict = {}

    let spotWithinBooking = toEdit.Spot

    let allBookingsForSpot = await spotWithinBooking.getBookings({
        where: {
            id: {
                [Op.ne]:toEdit.id //grabbing all the bookings besides the current users
            }
        },
    })

    let currentBookingJSON = []
    allBookingsForSpot.forEach(eachBooking => {
        currentBookingJSON.push(eachBooking.toJSON())
    })


    currentBookingJSON.forEach(individualBooking => {

        const currentBookingStartDate = new Date(individualBooking.startDate)
        const currentBookingStartDateTime = currentBookingStartDate.getTime()
        const currentBookingEndDate = new Date(individualBooking.endDate)
        const currentBookingEndDateTime = currentBookingEndDate.getTime()


        if (startDateTime >= currentBookingStartDateTime && startDateTime <= currentBookingEndDateTime) {
            errorsBookingConflict.startDate = "Start date conflicts with an existing booking"
        }

        if (endDateTime >= currentBookingStartDateTime && endDateTime <= currentBookingEndDateTime) {
            errorsBookingConflict.endDate = "End date conflicts with an existing booking"
        }

    })


    if (Object.keys(errorsToPrint).length > 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: errorsToPrint
        })
    }

    if (Object.keys(errorsBookingConflict).length > 0) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified date",
            errors: errorsBookingConflict
        })
    }


    toEdit.set({
        startDate: startDate || toEdit.startDate,
        endDate: endDate || toEdit.endDate
    })

    await toEdit.save()
    return res.json({
        id: toEdit.id,
        spotId: toEdit.spotId,
        userId: toEdit.userId,
        startDate: toEdit.startDate,
        endDate: toEdit.endDate,
        createdAt: toEdit.createdAt,
        updatedAt: toEdit.updatedAt
    })
    // return res.json(toEdit)


})


//DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    let bookingId = req.params.bookingId
    const toDelete = await Booking.findByPk(bookingId)

    if(!toDelete || userId !== toDelete.userId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    // return res.json(toDelete.startDate)
    const toDeleteStartDate = new Date(toDelete.startDate)
    const toDeleteStartDateTime = toDeleteStartDate.getTime()
    const toDeleteEndDate = new Date(toDelete.endDate)
    const toDeleteEndDateTime = toDeleteEndDate.getTime()
    const currentDate = new Date()
    const currentDateTime = currentDate.getTime()

    if(currentDateTime >= toDeleteStartDateTime) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await toDelete.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})










module.exports = router;
