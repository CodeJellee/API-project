// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetSpotById} from "../../store/spots";
import './Spots.css';



const SpotId = () => {
    let {spotId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSpotById(spotId));
    }, [dispatch]);

    const spots = useSelector((state) => (state.spots.spots));

    if(!spots) return null //NEED THIS, bc will cause error w/ refresh
    console.log('THIS IS WHAT WERE WORKING WITH', spots.SpotImages)

    return (
    <>
        <div id="spot-details-container">
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>
          <div>
            {spots.SpotImages.map((spot) => (
                <img id={spots.SpotImages[spots.SpotImages.indexOf(spot)].id} src={spots.SpotImages[spots.SpotImages.indexOf(spot)].url}></img>
            ))}
          </div>
          <div>
            <div>
                <div>Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
                <div>{spots.description}</div>
            </div>
            <div>
                <div>$ {spots.price} night, ★ {spots.avgRating} · {spots.numReviews} reviews</div>
                <button>Reserve</button>
            </div>
            <div>
                <h3>add a line here to seprate above and start of below</h3>
                <div>★ {spots.avgRating} · {spots.numReviews} reviews</div>
                <div>
                    <h3>{spots.Owner.firstName}</h3>
                    <h4>{spots.createdAt}THIS IS ASS DATE...NEED TO JUST BE MONTH AND YEAR</h4>
                </div>
            </div>
          </div>
        </div>

    </>
    );

  };

  export default SpotId;


//   <div>
//             {spots.spotImages.map((eachSpotImageSet) =>
//                 eachSpotImageSet.url.map((singleImage) =>
//                     <img src=singleImage></img>
//                 )
//                 </div>
//             )}
