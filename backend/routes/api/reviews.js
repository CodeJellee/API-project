// backend/routes/api/reviews.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//GET ALL REVIEWS
router.get('/current', requireAuth, async(req, res, next) => {

    const allReviews = await Review.findByPk(req.user.id, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    include: [[sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id)'), 'previewImage'],],
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt'],
                }
            }
        ],
    })
    return res.json({Reviews: allReviews})
})








module.exports = router;
