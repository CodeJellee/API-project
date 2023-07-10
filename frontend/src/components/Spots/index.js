
// frontend/src/components/Spots/index.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchGetAllSpots} from "../../store/spots";
import EachSpot from "./GetAllSpots";
import './Spots.css';



const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots.spots)); // using Object.values to turn obj into an array to be mapped below

    useEffect(() => {
      dispatch(fetchGetAllSpots());
    }, [dispatch]);


    return (
    <>
        <div id="spots-container">
          {spots.map((spot) => (
            <div key={spot.id} id="spots-item">
              <NavLink to={`/spots/${spot.id}`} id="spots-link" title={spot.name}>
                <EachSpot spot={spot}/>
              </NavLink>
            </div>
          ))}
        </div>

    </>
    );

  };

  export default Spots;
