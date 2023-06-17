// backend/routes/api/spot-images.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//DELETE A SPOT IMAGE
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    let imageId = req.params.imageId

    const relatedImage = await SpotImage.findByPk(imageId)

    if(!relatedImage){
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }


    const spot = await Spot.findByPk(relatedImage.spotId)

    if(!spot ||userId !== spot.ownerId) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    await relatedImage.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})


















module.exports = router;
