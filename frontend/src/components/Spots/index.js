
  // // frontend/src/components/Spots/index.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchGetAllSpots} from "../../store/spots";
import EachSpot from "./GetAllSpots";
import './Spots.css';


const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots)); // using Object.values to turn obj into an array to be mapped below

    useEffect(() => {
      dispatch(fetchGetAllSpots());
    }, [dispatch]);

    return (
    <>
        <div className="spots-container">
          {spots.map((spot) => (
            <div key={spot.id} className="spots-item">
              <NavLink to={`/spots/${spot.id}`} className="spots-link">
                <EachSpot spot={spot}/>
              </NavLink>
            </div>
          ))}
        </div>

    </>
    );

  };

  export default Spots;


  /*
  return (
      <div className='main-spots-container'>
        <div className="spots-container">
          {spots.map((spot) => (
            <div key={spot.id} className="spots-item">
              <NavLink to={`/spots/${spot.id}`} className="spots-link">
                {spot.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );

  */
