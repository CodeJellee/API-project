import React from "react";

function ConfirmationBox({ deleteSpot, doNotDeleteSpot }) {
  return (
    <>
      <h4>Confirm Delete</h4>
      <h3>Are you sure you want to delete this review?</h3>
      <button onClick={deleteSpot}>Yes (Delete Spot)</button>
      <button onClick={doNotDeleteSpot}>No (Keep Spot)</button>
    </>
  );
}

export default ConfirmationBox;
