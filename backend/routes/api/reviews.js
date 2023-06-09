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
                exclude: ['description','createdAt', 'updatedAt'],
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

//from the 5th video, review again --> maybe theres an easier way, ie use map
    let allReviewJSON = []
    allReviews.forEach(eachReview => {
        allReviewJSON.push(eachReview.toJSON())
    });

    allReviewJSON.forEach(eachImage => {
        eachImage.Spot.previewImage = eachImage.Spot.SpotImages[0].previewImage
        delete eachImage.Spot["SpotImages"]
        delete eachImage.Spot["description"]
        delete eachImage.Spot["createdAt"]
        delete eachImage.Spot["updatedAt"]
    })


    res.json({
        Reviews: allReviewJSON
    })

});

//ADD AN IMAGE TO A REVIEW BASED ON THE REVIEWS ID
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    const imageAdd = await Review.findByPk(req.params.reviewId)

    if(!imageAdd || userId !== imageAdd.userId) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {reviewId: imageAdd.id}
    })



    if (reviewImages.length >= 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached",
        })
    }

    const { url } = req.body
    const newImage = await ReviewImage.create({
        reviewId: imageAdd.id,
        url
    })


    return res.json({
        id: newImage.id,
        url: newImage.url
    })
});




//EDIT A REVIEW
router.put('/:reviewId', requireAuth, async(req, res, next) => {
let userId = req.user.id
let toUpdate = await Review.findByPk(req.params.reviewId)

const { review, stars } = req.body

//checking if spotId was provided in req
if(!toUpdate) {
    res.status(404)
    return res.json({
        message: "Spot couldn't be found"
    })
}

//only user can edit
if(userId !== toUpdate.userId){
    res.status(404)
    return res.json({
        message: "Review couldn't be found"
    })
}


//checking if info is valid
let errorsToPrint = {}

if(!review || review === null) {
    errorsToPrint.review = "Review text is required"
}

if(!stars || stars === null || !Number.isInteger(stars)|| stars === 0 || stars > 5) {
    errorsToPrint.stars = "Stars must be an integer from 1 to 5"
}

if (Object.keys(errorsToPrint).length > 0) {
    res.status(400)
    return res.json({
        message: "Bad Request",
        errors: errorsToPrint
    })
}

toUpdate.set({
    userId: userId,
    spotId: toUpdate.spotId,
    review: review || toUpdate.review,
    stars: stars || toUpdate.stars
})

await toUpdate.save()
return res.json(toUpdate)

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
