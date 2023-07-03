// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchCreateSpot} from "../../store/spots";
import {Route} from "react-router-dom"
import * as spotsActions from '../../store/spots'
import './Spots.css';


const NewSpot = () => {
    // const dispatch = useDispatch();
    // console.log('WHAT IS THIS', state)
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    // const [errors, setErrors] = useState({});
    //how to check is user is same user?.....


    // useEffect(() => {
    //     dispatch(fetchCreateSpot());
    // }, [dispatch]);

    // const newSpotData = useSelector((state) => Object.values(state))
    // if (!newSpotData) return null; //not sure if i need to add this to prevent break when it refreshes?

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (spotId !== createNewSpot.id) {
//     //   setErrors({});
//       return dispatch(
//         spotsActions.fetchCreateSpot({
//             address,
//             city,
//             state,
//             country,
//             lat,
//             lng,
//             name,
//             description,
//             price,
//         })
//       ).catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       });
//     }
//     return setErrors({
//       confirmPassword: "Confirm Password field must be the same as the Password field"
//     });

    return (
        <>
        <div id="main-container">
            <div id="location-container">
                <h1>Create New Spot</h1>
                <h2>Where's your place located?</h2>
                <h4>Guests will only get your exact address once they booked a reservation.</h4>
                <div id='fill-ins'>
                    <h5>Country</h5>
                        <input type="text" id="country" placeholder="Country"></input>
                    <h5>Street Address</h5>
                        <input type="text" id="address" placeholder="Address"></input>
                    <div id="city-state">
                        <h5>City</h5>
                            <input type="text" id="city" placeholder="City"></input>
                        <h5>State</h5>
                            <input type="text" id="state" placeholder="STATE"></input>
                    </div>
                </div>
            </div>
            <div id="spot-description-container">
                <h4>Describe your place to guests</h4>
                <h5>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h5>
                    <textarea id="freeform" name="freeform" rows="4" cols="50" placeholder="Description"></textarea>
            </div>
            <div id="spot-title-container">
                <h4>Create a title for your spot</h4>
                <h5>Catch guests' attention with a spot title that highlights what makes your place special.</h5>
                    <input type="text" id="title" placeholder="Name of your spot"></input>
            </div>
            <div id="spot-price-container">
                <h4>Set a base price for your spot</h4>
                <h5>Competitive pricing can help your listing stand out and rank higher in search results.</h5>
                    <input type="text" id="price" placeholder="Price per night (USD)"></input>
            </div>
            <div id="spot-photos-container">
                <h4>Liven up your spot with photos</h4>
                <h5>Submit a link to at least one photo to publish your spot</h5>
                <div id="upload-images">
                    <input type="text" id="preview-img" placeholder="Preview Image URL"></input>
                    <input type="text" id="image-1" placeholder="Image URL"></input>
                    <input type="text" id="image-2" placeholder="Image URL"></input>
                    <input type="text" id="image-3" placeholder="Image URL"></input>
                    <input type="text" id="image-4" placeholder="Image URL"></input>
                </div>
            </div>
        </div>
        <button type="submit">Create Spot</button>
        </>
    )
};

export default NewSpot
