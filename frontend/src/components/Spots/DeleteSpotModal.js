// frontend/src/components/DeleteSpotModal/index.js
import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchDeleteSpot } from "../../store/spots";
// import { actionClearDeleteSpot } from "../../store/spots";
import { useEffect } from "react";




function DeleteSpotModal({spotId}) {

    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault();
        dispatch(fetchDeleteSpot(spotId))
        .then(closeModal)
    }


    return (
        <div id="delete-lieu-modal">
            <div id="confirm-delete-spot">Confirm Delete</div>
            <h3 id="delete-spot-description">Are you sure you want to remove this spot from the listings?</h3>
            <div id="delete-spot-buttons-two">
                <button id="spot-yes" onClick={onClick}>Yes (Delete Spot)</button>
                <button id="spot-no" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    );
}

export default DeleteSpotModal;
