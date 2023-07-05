// frontend/src/components/DeleteSpotModal/index.js
import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchDeleteSpot } from "../../store/spots";




function DeleteSpotModal({spotId}) {

    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault();
        dispatch(fetchDeleteSpot(spotId))
        .then(closeModal)
    }



    return (
        <>
            <h4>Confirm Delete</h4>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={onClick}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    );
}

export default DeleteSpotModal;
