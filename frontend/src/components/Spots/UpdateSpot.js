// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { fetchUpdateSpot } from "../../store/spots";
import {fetchCreateSpot} from "../../store/spots";
import * as spotsActions from '../../store/spots'
import './Spots.css';


const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotId = useSelector(state => state.spots.singleSpot);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const [imageOne, setImageOne] = useState("")
    const [imageTwo, setImageTwo] = useState("")
    const [imageThree, setImageThree] = useState("")
    const [imageFour, setImageFour] = useState("")

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

        if(previewImage === "") {
            errorsObject.previewImage = "Preview image is required."
        }

        if(previewImage && !(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg'))) {
            errorsObject.previewImage = "Preview image must end in .png, .jpg, or .jpeg"
        }

        if(imageOne && !(imageOne.endsWith('.png') || imageOne.endsWith('.jpg') || imageOne.endsWith('.jpeg'))) {
            errorsObject.imageOne = "Images must end in .png, .jpg, or .jpeg"
        }

        if(imageTwo && !(imageTwo.endsWith('.png') || imageTwo.endsWith('.jpg') || imageTwo.endsWith('.jpeg'))) {
            errorsObject.imageTwo = "Images must end in .png, .jpg, or .jpeg"
        }

        if(imageThree && !(imageThree.endsWith('.png') || imageThree.endsWith('.jpg') || imageThree.endsWith('.jpeg'))) {
            errorsObject.imageThree = "Images must end in .png, .jpg, or .jpeg"
        }

        if(imageFour && !(imageFour.endsWith('.png') || imageFour.endsWith('.jpg') || imageFour.endsWith('.jpeg'))) {
            errorsObject.imageFour = "Images must end in .png, .jpg, or .jpeg"
        }

        if (Object.values(errorsObject).length) return setErrors(errorsObject) // if there are any errors, stop here and return the errors

        let images =[previewImage, imageOne, imageTwo, imageThree, imageFour] //created an array of the images provided

        images = images.filter(image => !!image) //empty strings in images array is messing up the await? so need the filter this way

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

        let fetchResponseFromThunk = await dispatch(fetchUpdateSpot(payload, images, spotId)); //fetch response will return and obj of errors or newly created spotsId
        // console.log('WHAT IS THIS- this is the new spot id for the new spot created', fetchResponseFromThunk.id)
        history.push(`/spots/${fetchResponseFromThunk.id}`)

    }



    return (
        <form id="create-new-spot-form" onSubmit={onSubmit}>
            <div id="main-container">
                <div id="location-container">
                    <h1>Create New Spot</h1>
                    <h4>Where's your place located?</h4>
                    <h5>Guests will only get your exact address once they booked a reservation.</h5>
                    <label>
                    Country
                    <br></br>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                {submitted && errors.country && <p className="errors">{errors.country}</p>}
                <br></br>
                <label>
                    Street Address
                    <br></br>
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    </label>
                    {submitted && errors.address && <p className="errors">{errors.address}</p>}
                    <br></br>
                    <label>
                        City
                        <br></br>
                        <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {submitted && errors.city && <p className="errors">{errors.city}</p>}
                    <br></br>
                    <label>
                        State
                        <br></br>
                        <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    {submitted && errors.state && <p className="errors">{errors.state}</p>}
                </div>

                <div id="spot-description-container">
                    <h4>Describe your place to guests</h4>
                    <h5>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h5>
                    <label>
                        <textarea
                        type="text"
                        name="description"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {submitted && errors.description && <p className="errors">{errors.description}</p>}
                </div>

                <div id="spot-title-container">
                    <h4>Create a title for your spot</h4>
                    <h5>Catch guests' attention with a spot title that highlights what makes your place special.</h5>
                    <label>
                        <input
                        type="text"
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
                    <h5>Competitive pricing can help your listing stand out and rank higher in search results.</h5>
                    <label>
                        <input
                        type="text"
                        name="price"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {submitted && errors.price && <p className="errors">{errors.price}</p>}
                </div>

                <div id="spot-photos-container">
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
                </div>
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
