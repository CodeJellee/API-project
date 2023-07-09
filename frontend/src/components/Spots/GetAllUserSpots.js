import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchGetSpotsByUser} from "../../store/spots";
import DeleteSpotModal from "./DeleteSpotModal";
import OpenModalButton from "../OpenModalButton"
import "./Spots.css"



import EachSpot from "./GetAllSpots";
import './Spots.css';
import UpdateSpotForm from "./UpdateSpot";


const UserSpots = () => {
    const dispatch = useDispatch();
    const allUserSpots = useSelector((state) => Object.values(state.spots.userSpots)); // using Object.values to turn obj into an array to be mapped below


    useEffect(() => {
      dispatch(fetchGetSpotsByUser());
    }, [dispatch]);


    return (
        <div id="user-spots-container">
            <h1 id="manage-spot-header">Manage Spots</h1>
            <div id="manage-each-spots">
                {allUserSpots.length > 0 ? (
                    allUserSpots.map((spot) => (
                        <div key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} id="spots-link">
                                <EachSpot spot={spot}/>
                            </NavLink>
                            <div id="all-user-buttons-container">
                            <button id="all-user-buttons">
                            <NavLink exact to={`/spots/${spot.id}/edit`}>
                                Update
                            </NavLink>
                            </button>
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
        </div>
    );
}



export default UserSpots;
