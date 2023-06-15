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
            [sequelize.col('SpotImages.url'), 'previewImage']
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

        group: ['Spot.id', 'SpotImages.id'] //group query result based on 'id' column of the 'Spot' model- needed this bc only 1 spot was printing
    })
    return res.json({Spots: allSpots})
})

//CREATE A SPOT
router.post('/', requireAuth, async(req, res, next) => {
    let errorsToPrint = {}
    const userId = req.user.id
    // console.log(userId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!address || address === null) {
        errorsToPrint.address = "Street address is required"
    }

    if(!city || city === null) {
        errorsToPrint.city = "City is required"
    }

    if(!state || state === null) {
        errorsToPrint.state = "State is required"
    }

    if(!country || country === null) {
        errorsToPrint.country = "Country is required"
    }

    if(!lat || lat === null) {
        errorsToPrint.lat = "Latitude is not valid"
    }

    if(!lng || lng === null) {
        errorsToPrint.lng = "Longitude is not valid"
    }

    if(!name || name === null) {
        errorsToPrint.name = "Name must be less than 50 characters"
    }

    if(!description || description === null) {
        errorsToPrint.description = "Description is required"
    }

    if(!price || price === null) {
        errorsToPrint.price = "Price per day is required"
    }

    if (Object.keys(errorsToPrint).length > 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: errorsToPrint
        })
    }


    const newSpot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price

    })
    return res.json(newSpot)

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
            // [sequelize.literal('(SELECT url FROM "SpotImages" WHERE "SpotImages".spotId = "Spot".id)'), 'previewImage'], //provide a raw SQL expression -> selecting url from SpotImages where they match, w/ alias to second param
            [sequelize.col('SpotImages.url'), 'previewImage'],
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
    group: ['Spot.id', "SpotImages.url"]

    });

    return res.json(currentUserSpots);
});

//ADD AN IMAGE TO A SPOT BASED ON THE SPOTS ID

router.post('/:spotId/images', requireAuth, async(req, res, next) => {

    let userId = req.user.id
    let addPhoto = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body

    if(req.user.id !== addPhoto.ownerId || !addPhoto){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const newPhoto = await SpotImage.create({
        spotId: userId,
        url,
        preview
    })

    const newPhotoJSON = newPhoto.toJSON() //turning it into plain JSON obj to then directly delete attributes
    delete newPhotoJSON.updatedAt
    delete newPhotoJSON.createdAt


    return res.json(newPhotoJSON) //need to return updated: newPhotoJSON

});

//GET REVIEWS BY SPOT ID
router.get('/:spotId/reviews', async(req, res, next) => {

    const spotReviews = await Review.findByPk(req.params.spotId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt'],
                }
            }
        ],
    })

    if(!spotReviews){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    return res.json({Reviews: spotReviews})
});



//GET SPOT FROM AN ID
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
        ],

        group: ["Spot.id","SpotImages.id"]
    })

if (specificSpot.id === null) {
    res.status(404)
    return res.json({
        message: "Spot couldn't be found"
    })
}

return res.json(specificSpot)

});

//EDIT A SPOT
router.put('/:spotId', requireAuth, async(req, res, next) => {
    let errorsToPrint = {}
    let userId = req.user.id
    let toUpdate = await Spot.findByPk(req.params.spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(req.user.id !== toUpdate.ownerId || !toUpdate){
        res.status(400)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if(!address || address === null) {
        errorsToPrint.address = "Street address is required"
    }

    if(!city || city === null) {
        errorsToPrint.city = "City is required"
    }

    if(!state || state === null) {
        errorsToPrint.state = "State is required"
    }

    if(!country || country === null) {
        errorsToPrint.country = "Country is required"
    }

    if(!lat || lat === null) {
        errorsToPrint.lat = "Latitude is not valid"
    }

    if(!lng || lng === null) {
        errorsToPrint.lng = "Longitude is not valid"
    }

    if(!name || name === null) {
        errorsToPrint.name = "Name must be less than 50 characters"
    }

    if(!description || description === null) {
        errorsToPrint.description = "Description is required"
    }

    if(!price || price === null) {
        errorsToPrint.price = "Price per day is required"
    }

    if (Object.keys(errorsToPrint).length > 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: errorsToPrint
        })
    }


    toUpdate.set({
        ownerId: userId,
        address: address || toUpdate.address,
        city: city || toUpdate.city,
        state: state || toUpdate.state,
        country: country || toUpdate.country,
        lat: lat || toUpdate.lat,
        lng: lng || toUpdate.lng,
        name: name || toUpdate.name,
        description: description || toUpdate.description,
        price: price || toUpdate.price,
    });


    await toUpdate.save()
    return res.json(toUpdate)


})

//DELETE A SPOT
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    let userId = req.user.id
    const toDelete = await Spot.findByPk(req.params.spotId)

    if(!toDelete || userId !== toDelete.ownerId) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    await toDelete.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})





module.exports = router;
