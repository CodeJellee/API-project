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

    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let errorsToPrint = {}

    if(maxLat && isNaN(Number(maxLat))) {
        errorsToPrint.maxLat = "Maximum latitude is invalid"
    }

    if(minLat && isNaN(Number(minLat))) {
        errorsToPrint.minLatLat = "Minimum latitude is invalid"
    }

    if(maxLng && isNaN(Number(maxLng))) {
        errorsToPrint.maxLng = "Maximum longitude is invalid"
    }

    if(minLng && isNaN(Number(minLng))){
        errorsToPrint.minLng = "Minimum longitude is invalid"
    }

    if(maxPrice && Number(maxPrice) < 0){
        errorsToPrint.maxPrice = "Maximum price must be greater than or equal to 0"
    }

    if(minPrice && Number(minPrice) < 0){
        errorsToPrint.minPrice = "Minimum price must be greater than or equal to 0"
    }

    if (Object.keys(errorsToPrint).length > 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: errorsToPrint
        })
    }


    let pagination = {}

    page = parseInt(page)
    size = parseInt(size)

    if (Number.isNaN(page) || Number(page) < 1 || Number(page) > 10) page = 1;
    if (Number.isNaN(size) || Number(size) < 1 || Number(size) > 20) size = 20;

    pagination.limit = size
    pagination.offset = size * (page - 1)


    const allSpots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                attributes: ['url']
            },
            {
                model: Review,
                attributes: ['stars']
            }
        ],
        ...pagination
    })


    let allSpotsJSON = []

    allSpots.forEach(eachSpot => {

        allSpotsJSON.push(eachSpot.toJSON())
    })
/********************NEEDED TO ADD NULL ELEMENT********************************/
    allSpotsJSON.forEach(spotPOJO => {
        if (spotPOJO.SpotImages && spotPOJO.SpotImages[0]) {
            spotPOJO.previewImage = spotPOJO.SpotImages[0].url;
        } else {
            spotPOJO.previewImage = null;
        }
        if (!spotPOJO.SpotImages) {
            spotPOJO.previewImage = null;
        }
        delete spotPOJO.SpotImages;
    })

    allSpotsJSON.forEach(spotPOJO => {
        let sum = 0

        spotPOJO.Reviews.forEach(review => {
            sum += review.stars
        })

        let reviewLength = spotPOJO.Reviews.length
        let avgRatingValue = sum / reviewLength

        spotPOJO.avgRating = avgRatingValue.toFixed(1)
        delete spotPOJO.Reviews
        spotPOJO.price = spotPOJO.price.toFixed(2)
    })



    return res.json({
        Spots: allSpotsJSON,
        page: Number(page),
        size: Number(size)
    })
})

//CREATE A SPOT
router.post('/', requireAuth, async(req, res, next) => {
    let errorsToPrint = {}
    const userId = req.user.id
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

    if(!lat || lat === null || isNaN(lat)) {
        errorsToPrint.lat = "Latitude is not valid"
    }

    if(!lng || lng === null || isNaN(lng)) {
        errorsToPrint.lng = "Longitude is not valid"
    }

    if(!name || name === null|| name.length >50) {
        errorsToPrint.name = "Name must be less than 50 characters"
    }

    if(!description || description === null) {
        errorsToPrint.description = "Description is required"
    }

    if(!price || price === null) {
        errorsToPrint.price = "Price per night is required"
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
    res.status(201)
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

    return res.json({Spots: currentUserSpots});
});

//GET REVIEWS BY SPOT ID
router.get('/:spotId/reviews', async(req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
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

    return res.json({Reviews: spotReviews})
});

//GET BOOKINGS FOR A SPOT BASED ON SPOTS ID
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const allBookingsById = await Booking.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })


    if(allBookingsById.length === 0){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    let nonOwnerJSON = []

    allBookingsById.forEach(eachEl => {
        nonOwnerJSON.push(eachEl.toJSON())
    });

    console.log('NON OWNER JSON', nonOwnerJSON)

    if(userId !== nonOwnerJSON[0].userId){
        res.status(200)

        let forNonOwners = {}
        nonOwnerJSON.forEach(eachNon => {

            forNonOwners.spotId = eachNon.spotId
            forNonOwners.startDate = eachNon.startDate
            forNonOwners.endDate = eachNon.endDate
        });

        return res.json({
            Bookings: [forNonOwners]
        })
    }


    if(userId === nonOwnerJSON[0].userId){
        res.status(200)
        return res.json({
            Bookings: allBookingsById
        })
    }
})

//ADD AN IMAGE TO A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/images', requireAuth, async(req, res, next) => {

    let { spotId } = req.params

    let userId = req.user.id
    let addPhoto = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body


    if(!addPhoto || userId !== addPhoto.ownerId || addPhoto === null){ //changed req.user.id to userId
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const newPhoto = await SpotImage.create({
        spotId,
        url,
        preview
    })

    const newPhotoJSON = newPhoto.toJSON() //turning it into plain JSON obj to then directly delete attributes
    delete newPhotoJSON.updatedAt
    delete newPhotoJSON.createdAt


    return res.json(newPhotoJSON) //need to return updated: newPhotoJSON

});



//CREATE A BOOKING FROM A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {

    let userId = req.user.id
    let bookingId = req.params.spotId
    let addBooking = await Spot.findByPk(bookingId)
    const { startDate, endDate } = req.body


    if(!addBooking) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if(userId === addBooking.ownerId){
        return res.json({
            message: "Spot belongs to the current user"
        })
    }


    let errorsToPrint = {}

    const startDateObj = new Date(startDate)
    const startDateTime = startDateObj.getTime() //changing date into a time where we can check if new date change 'falls within the time range from start to end date of whats already in our booking database"
    const endDateObj = new Date(endDate)
    const endDateTime = endDateObj.getTime()
    const currentDate = new Date()

    if(startDateObj > endDateObj) {
        errorsToPrint.endDate = "endDate cannot come before startDate"
    }

    let errorsBookingConflict = {}

    const currentBookings = await Booking.findAll()

    let currentBookingJSON = []
    currentBookings.forEach(eachBooking => {
        currentBookingJSON.push(eachBooking.toJSON())
    })

    currentBookingJSON.forEach(individualBooking => {

        const currentBookingStartDate = new Date(individualBooking.startDate)
        const currentBookingStartDateTime = currentBookingStartDate.getTime()
        const currentBookingEndDate = new Date(individualBooking.endDate)
        const currentBookingEndDateTime = currentBookingEndDate.getTime()


        if (startDateTime >= currentBookingStartDateTime && startDateTime <= currentBookingEndDateTime) {
            errorsBookingConflict.startDate = "Start date conflicts with an existing booking"
        }

        if (endDateTime >= currentBookingStartDateTime && endDateTime <= currentBookingEndDateTime) {
            errorsBookingConflict.endDate = "End date conflicts with an existing booking"
        }
    })


    if (Object.keys(errorsToPrint).length > 0) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: errorsToPrint
        })
    }

    if (Object.keys(errorsBookingConflict).length > 0) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified date",
            errors: errorsBookingConflict
        })
    }

    const newBooking = await Booking.create({
        spotId: Number(req.params.spotId),
        userId: userId,
        startDate,
        endDate
    })

    return res.json(newBooking)

})


//CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/reviews', requireAuth, async(req, res, next) => {

        const specificSpot = req.params.spotId
        const { review, stars } = req.body

        //checking to see if exist
        const existingReview = await Review.findOne({
            where: {
                userId: req.user.id,
                spotId: specificSpot
            }
        });

        if (existingReview){
            res.status(500) //api doc states 500, kanban states 403
            return res.json({
                message: "User already has a review from this spot"
            })
        }

        //checking if spotId was provided in req
        const singleSpot = await Spot.findByPk(specificSpot)

        if(!singleSpot) {
            res.status(404)
            return res.json({
                message: "Spot couldn't be found"
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


        const addReview = await Review.create({
            userId: req.user.id,
            spotId: specificSpot,
            review,
            stars
        })

        res.status(201)
        return res.json(addReview)

})


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

        group: ["Spot.id","SpotImages.id","Owner.id"]
    })

if (specificSpot === null || !specificSpot) {
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
    let spotId = req.params.spotId
    let toUpdate = await Spot.findByPk(spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!toUpdate || userId !== toUpdate.ownerId || toUpdate === null || !spotId){
        res.status(404)
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

    if(!lat || lat === null || isNaN(lat)) {
        errorsToPrint.lat = "Latitude is not valid"
    }

    if(!lng || lng === null || isNaN(lng)) {
        errorsToPrint.lng = "Longitude is not valid"
    }

    if(!name || name === null|| name.length >50) {
        errorsToPrint.name = "Name must be less than 50 characters"
    }

    if(!description || description === null) {
        errorsToPrint.description = "Description is required"
    }

    if(description.length < 30){
        errorsToPrint.description = "Description needs a minimum of 30 characters"
    }

    if(!price || price === null) {
        errorsToPrint.price = "Price is required"
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
