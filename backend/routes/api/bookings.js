// backend/routes/api/bookings.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//DELETE A BOOKING

router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    const toDelete = await Booking.findByPk(req.params.bookingId)

    if(userId !== toDelete.userId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    // if(BOOKING HAS BEEN STARTEDCANNOT BE DELETED)

    await toDelete.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})









module.exports = router;
