// // frontend/src/components/Spots/index.js
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {fetchGetAllSpots} from "../../store/spots";
import './Spots.css';


const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector((state) => Object.values(state.spots));//using Object.values to turn obj into an array to be mapped below

    useEffect(() => {
        dispatch(fetchGetAllSpots())
    }, [dispatch])

    console.log('AM I GRABBING', spots)

    return (
      <ul>
        {(spots).map((spot) => (
          <li key={spot.id} className="spots-item">
            <NavLink to={`/spots/${spot.id}`} className="spots-link">{spot.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  };

  export default Spots;
