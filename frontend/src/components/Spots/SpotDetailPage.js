// frontend/src/components/SpotDetailPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {fetchGetSpotById} from "../../store/spots";
import EachSpot from "./GetAllSpots";
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
            <h1>INSERT SPOT DATA HERE</h1>
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>
          <div>
            {spots.SpotImages.map((spot) => (
                <img src={spots.SpotImages.indexOf(spot).url}></img>
            ))}
          </div>
          <div>Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
          <div>{spots.description}</div>
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
