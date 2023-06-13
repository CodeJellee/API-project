// backend/routes/api/spots.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//GET ALL SPOTS OWNED BY THE CURRENT USER
// router.get('/current', requireAuth, async(req, res, next) => {
//     const currentUserSpots = await Spot.unscoped().findAll({
//         where: {
//             ownerId: req.user.id
//         },
//         include: [
//             Review,
//             SpotImage
//         ]
//     })

//     res.json(currentUserSpots)
// })


module.exports = router;
