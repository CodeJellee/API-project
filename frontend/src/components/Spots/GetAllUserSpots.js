import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchGetSpotsByUser} from "../../store/spots";
import EachSpot from "./GetAllSpots";
import './Spots.css';


const UserSpots = () => {
    const dispatch = useDispatch();
    const allUserSpots = useSelector((state) => Object.values(state.spots.userSpots)); // using Object.values to turn obj into an array to be mapped below
    console.log('waht is this', allUserSpots)

    useEffect(() => {
      dispatch(fetchGetSpotsByUser());
    }, [dispatch]);


    return (
        <>
            <div>
            {allUserSpots.map((spot) => (
                <div key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`} id="spots-link">
                        <EachSpot spot={spot}/>
                    </NavLink>
                </div>
            ))}
            </div>
        </>
    )

}

export default UserSpots;
