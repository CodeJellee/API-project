// backend/routes/api/reviews.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*
{
    "title": "Server Error",
    "message": "column Spot.SpotImages.url does not exist",
    "stack": null
}
*/

//GET ALL REVIEWS
router.get('/current', requireAuth, async(req, res, next) => {
//couldn't figure out via eagerloading
    const allReviews = await Review.findAll({
        attributes: [
            'id',
            'userId',
            'spotId',
            'review',
            'stars',
            'createdAt',
            'updatedAt'
        ],
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            },
            {
                model: Spot,
                exclude: ['createdAt', 'updatedAt'],
                include: {
                    model: SpotImage,
                    attributes: [['url', "previewImage"]]
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]

    })

//from the video, review again --> maybe theres an easier way, ie use map
    let allReviewJSON = []
    allReviews.forEach(eachReview => {
        allReviewJSON.push(eachReview.toJSON())
    });

    allReviewJSON.forEach(eachImage => {
        // console.log(eachImage)
        // console.log(eachImage.Spot.SpotImages[0].previewImage)
        eachImage.Spot.previewImage = eachImage.Spot.SpotImages[0].previewImage
        delete eachImage.Spot["SpotImages"]
    })


    res.json(allReviewJSON)

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
