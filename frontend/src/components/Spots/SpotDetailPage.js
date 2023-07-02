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

    return (
    <>
        <div id="spot-details-container">
            <h1>INSERT SPOT DATA HERE</h1>
          <h1>{spots.name}</h1>
          <h2>{spots.city}, {spots.state}, {spots.country}</h2>
          <div>
            <img src={spots.SpotImages[0].url}></img>
          </div>
          <div>Hosted by {spots.Owner.firstName} {spots.Owner.lastName} </div>
          <div>{spots.description}</div>
        </div>

    </>
    );

  };

  export default SpotId;
