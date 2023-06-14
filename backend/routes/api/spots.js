// backend/routes/api/spots.js
const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Booking, Review, SpotImage, ReviewImage, Spot, sequelize} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//GET ALL SPOTS
router.get('/', async(req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
            [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"], //Sequelize function that generates a function call in SQL-AVG and generates a column reference, alias w/ second param
            [sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id)'), 'previewImage'], //provide a raw SQL expression -> selecting url from SpotImages where they match, w/ alias to second param
            ]
        },

        include:[
        {
            model: Review,
            attributes: []
        },
        {
            model: SpotImage,
            attributes: []
        }
        ],

        group: ['Spot.id'] //group query result based on 'id' column of the 'Spot' model- needed this bc only 1 spot was printing
    })
    return res.json({Spots: allSpots})
})

//GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
    const currentUserSpots = await Spot.findAll({
    where:
        {
        ownerId: req.user.id
        },
        attributes: {
            include: [
            [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"], //Sequelize function that generates a function call in SQL-AVG and generates a column reference, alias w/ second param
            [sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id)'), 'previewImage'], //provide a raw SQL expression -> selecting url from SpotImages where they match, w/ alias to second param
            ]
        },
    include:[
        {
        model: Review,
        attributes: []
        },
        {
        model: SpotImage,
        attributes: []
        }
    ]

    });

    return res.json(currentUserSpots);
});



//GET SPOT FROM AN ID --ERROR MSG NOT THROWING
router.get('/:spotId', async(req, res, next) => {
    let specificSpot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
            [sequelize.fn('COUNT', sequelize.col("Reviews.stars")), "numReviews"],
            [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"] //Sequelize function that generates a function call in SQL-AVG and generates a column reference, alias w/ second param
            ]
        },
        include:[
        {
            model: Review,
            attributes: []
        },
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }
        ]
    })

if (specificSpot.id === null) {
    res.status(404)
    return res.json({
        message: "Spot couldn't be found"
    })
}

return res.json(specificSpot)

})





module.exports = router;
