import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchGetSpotsByUser} from "../../store/spots";
import {actionClearSpotsByUser} from "../../store/spots";
import DeleteSpotModal from "./DeleteSpotModal";
import OpenModalButton from "../OpenModalButton"


import EachSpot from "./GetAllSpots";
import './Spots.css';


const UserSpots = () => {
    const dispatch = useDispatch();
    const allUserSpots = useSelector((state) => Object.values(state.spots.userSpots)); // using Object.values to turn obj into an array to be mapped below


    useEffect(() => {
      dispatch(fetchGetSpotsByUser());
    }, [dispatch]);

    // useEffect(() => {
    //     return () => dispatch(actionClearSpotsByUser())
    // }, [dispatch])

    return (
        <>
            <h1>Manage Your Spots</h1>
            <div>
                {allUserSpots.length > 0 ? (
                    allUserSpots.map((spot) => (
                        <div key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} id="spots-link">
                                <EachSpot spot={spot}/>
                            </NavLink>
                            <div>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                            />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <NavLink to="/spots/" id="create-spot-link">Create a New Spot</NavLink>
                    </div>
                )}
            </div>
        </>
    );
}



export default UserSpots;
