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

        group: ['Spot.id']
    }) 

    return res.json({Reviews: allReviews})
});

//DELETE REVIEW
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    const toDelete = await Review.findByPk(req.params.reviewId)

    if(!toDelete || userId !== toDelete.userId) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    await toDelete.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})








module.exports = router;
