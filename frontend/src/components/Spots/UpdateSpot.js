// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { fetchUpdateSpot } from "../../store/spots";
import { fetchGetSpotById } from "../../store/spots";
import * as spotsActions from '../../store/spots'
import { useParams } from "react-router-dom";
import './Spots.css';


const UpdateSpotForm = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const spotId = useSelector(state => state.spots.spots);
    const {spotId} = useParams()
    // console.log('THIS SHOULD BE A VALUE', typeof spotId, typeof parseInt(spotId), parseInt(spotId))
    const oldSpotInfo = useSelector((state) => state.spots.singleSpot)
    console.log('what is oldSpotIfno', oldSpotInfo)

    useEffect(() => {
        console.log('THIS IS THE THUNK', fetchGetSpotById(spotId))
        dispatch(fetchGetSpotById(spotId));
    }, [dispatch])


    useEffect(() => {
        setAddress(oldSpotInfo.address)
        setCity(oldSpotInfo.city)
        setState(oldSpotInfo.state)
        setCountry(oldSpotInfo.country)
        setName(oldSpotInfo.name)
        setDescription(oldSpotInfo.description)
        setPrice(oldSpotInfo.price)

    }, [oldSpotInfo])

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // const [previewImage, setPreviewImage] = useState()
    // const [imageOne, setImageOne] = useState("")
    // const [imageTwo, setImageTwo] = useState("")
    // const [imageThree, setImageThree] = useState("")
    // const [imageFour, setImageFour] = useState("")

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)




    const onSubmit = async(e) => {
        e.preventDefault()
        setSubmitted(true);

        const errorsObject = {}

        if(address === "") {
            errorsObject.address = "Address is required."
        }

        if(city === "") {
            errorsObject.city = "City is required."
        }

        if(state === "") {
            errorsObject.state = "State is required."
        }

        if(country === "") {
            errorsObject.country = "Country is required."
        }

        if(name === "") {
            errorsObject.name = "Name is required."
        }

        if(description === "") {
            errorsObject.description = "Description is required."
        }

        if(description.length < 30) {
            errorsObject.description = "Description needs 30 or more characters."
        }

        if(price === "") {
            errorsObject.price = "Price is required."
        }

        // if(previewImage === "") {
        //     errorsObject.previewImage = "Preview image is required."
        // }

        // if(previewImage && !(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg'))) {
        //     errorsObject.previewImage = "Preview image must end in .png, .jpg, or .jpeg"
        // }

        // if(imageOne && !(imageOne.endsWith('.png') || imageOne.endsWith('.jpg') || imageOne.endsWith('.jpeg'))) {
        //     errorsObject.imageOne = "Images must end in .png, .jpg, or .jpeg"
        // }

        // if(imageTwo && !(imageTwo.endsWith('.png') || imageTwo.endsWith('.jpg') || imageTwo.endsWith('.jpeg'))) {
        //     errorsObject.imageTwo = "Images must end in .png, .jpg, or .jpeg"
        // }

        // if(imageThree && !(imageThree.endsWith('.png') || imageThree.endsWith('.jpg') || imageThree.endsWith('.jpeg'))) {
        //     errorsObject.imageThree = "Images must end in .png, .jpg, or .jpeg"
        // }

        // if(imageFour && !(imageFour.endsWith('.png') || imageFour.endsWith('.jpg') || imageFour.endsWith('.jpeg'))) {
        //     errorsObject.imageFour = "Images must end in .png, .jpg, or .jpeg"
        // }

        if (Object.values(errorsObject).length) return setErrors(errorsObject) // if there are any errors, stop here and return the errors

        // let images =[previewImage, imageOne, imageTwo, imageThree, imageFour] //created an array of the images provided

        // images = images.filter(image => !!image) //empty strings in images array is messing up the await? so need the filter this way

        let payload = {
            address,
            city,
            state,
            country,
            lat: 19.9403,
            lng: -33.2930,
            name,
            description,
            price: Number(price)
        }

        let fetchResponseFromThunk = await dispatch(fetchUpdateSpot(payload, spotId)); //fetch response will return and obj of errors or newly created spotsId
        // console.log('WHAT IS THIS- this is the new spot id for the new spot created', fetchResponseFromThunk.id)
        history.push(`/spots/${fetchResponseFromThunk.id}`)

    }



    return (
        <form id="create-new-spot-form" onSubmit={onSubmit}>
        <div id="main-container">
            <div id="location-container">
                <h2>Create New Spot</h2>
                <h4>Where's your place located?</h4>
                <div id="create-form-blurb">Guests will only get your exact address once they booked a reservation.</div>
                <br></br>

                <label>
                    <div id="label-and-error-info">
                        Country
                        {submitted && errors.country && <div className="errors">{errors.country}</div>}
                    </div>
                <input
                    type="text"
                    id="full-width"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>


            <label>
                <div id="label-and-error-info">
                Street Address
                {submitted && errors.address && <div className="errors">{errors.address}</div>}
                </div>
                <input
                    type="text"
                    id="full-width"
                    name="address"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                </label>

                <div id="city-and-state">
                <div>
                <div id="label-and-error-info">
                        City
                        {submitted && errors.city && <div className="errors">{errors.city}</div>}
                    </div>
                    <label>
                        <input
                        type="text"
                        id="full-width-city-state"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                </div>

                <div id="comma-fix">,</div>

                <div>
                    <div id="label-and-error-info">
                        State {submitted && errors.state && <div className="errors">{errors.state}</div>}
                    </div>
                    <label>
                        <input
                        type="text"
                        id="full-width-city-state"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    </div>
                </div>
            </div>

            <div id="spot-description-container">
                <h4>Describe your place to guests</h4>
                <div id="create-form-blurb">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
                <br></br>
                {submitted && errors.description && <p className="errors">{errors.description}</p>}
                <label>
                    <textarea
                    type="text"
                    id="full-width-box"
                    name="description"
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>

            <div id="spot-title-container">
                <h4>Create a title for your spot</h4>
                <div id="create-form-blurb">Catch guests' attention with a spot title that highlights what makes your place special.</div>
                <br></br>
                <label>
                    <input
                    type="text"
                    id="full-width"
                    name="name"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {submitted && errors.name && <p className="errors">{errors.name}</p>}
            </div>

            <div id="spot-price-container">
                <h4>Set a base price for your spot</h4>
                <div id="create-form-blurb">Competitive pricing can help your listing stand out and rank higher in search results.</div>
                <br></br>
                <div id="with-money-sign">
                <div>
                    $
                </div>
                <div id="full-width-cost">
                    <label>
                        <input
                        type="text"
                        id="full-width"
                        name="price"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {submitted && errors.price && <p className="errors">{errors.price}</p>}
                </div>
                </div>
            </div>

                {/* <div id="spot-photos-container">
                    <h4>Liven up your spot with photos</h4>
                    <h5>Submit a link to at least one photo to publish your spot</h5>
                    <label>
                        <input
                        type="text"
                        name="previewImage"
                        placeholder="Preview Image URL"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        />
                    </label>
                    {submitted && errors.previewImage && <p className="errors">{errors.previewImage}</p>}
                    <div id="upload-images">
                        <label>
                            <input
                            type="text"
                            name="imageOne "
                            placeholder="Image URL"
                            value={imageOne}
                            onChange={(e) => setImageOne(e.target.value)}
                            />
                        </label>
                        {submitted && errors.imageOne && <p className="errors">{errors.imageOne}</p>}
                        <br></br>
                        <label>
                            <input
                            type="text"
                            name="imageTwo"
                            placeholder="Image URL"
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                            />
                        </label>
                        {submitted && errors.imageTwo && <p className="errors">{errors.imageTwo}</p>}
                        <br></br>
                        <label>
                            <input
                            type="text"
                            name="imageThree"
                            placeholder="Image URL"
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                            />
                        </label>
                        {submitted && errors.imageThree && <p className="errors">{errors.imageThree}</p>}
                        <br></br>
                        <label>
                            <input
                            type="text"
                            name="imageFour"
                            placeholder="Image URL"
                            value={imageFour}
                            onChange={(e) => setImageFour(e.target.value)}
                            />
                        </label>
                        {submitted && errors.imageFour && <p className="errors">{errors.imageFour}</p>}
                    </div>
                </div> */}
            </div>
            <button
            type="submit"
            >
            Create Spot
            </button>
        </form>
    )
};

export default UpdateSpotForm





