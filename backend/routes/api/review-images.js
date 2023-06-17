// backend/routes/api/review-images.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//DELETE REVIEW IMAGE
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    let imageId = req.params.imageId

    const relatedImage = await ReviewImage.findByPk(imageId, {
        include: {
            model: Review
        }
    })

    if(!relatedImage){
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }



    // if(!relatedImage){
    //     res.status(404)
    //     return res.json({
    //         message: "Review Image couldn't be found"
    //     })
    // }


    const review = await Review.findByPk(relatedImage.reviewId)

    if(userId !== review.userId) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }

    await relatedImage.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})










module.exports = router;
