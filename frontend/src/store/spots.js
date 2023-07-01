import {csrfFetch} from './csrf'

//action type- CRUD
// const CREATE_SPOT = 'spots/createSpot'
// const GET_SPOT_BY_ID = 'spots/getSpotById'
const GET_ALL_SPOTS = 'spots/getAllSpots'
// const UPDATE_SPOT = 'spots/updateSpot'
// const DELETE_SPOT = 'spots/deleteSpot'

//action function
// const createSpot = () => ({
//     type: CREATE_SPOT,
//     // payload
// });

// const getSpotById = (spotId) => ({
//     type: GET_SPOT_BY_ID,
//     payload: spotId
// });

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS, //already an obj
    payload: spots
});

// const updateSpot = () => ({
//     type: UPDATE_SPOT,
//     // payload
// });

// const deleteSpot = () => ({
//     type: DELETE_SPOT,
//     // payload
// });


//thunks
/*----------------CREATE A SPOT ----------------------*/
// export const fetchCreateSpot = (spot) => async (dispatch) => {
//     const res = await csrfFetch('/api/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot),
//       });

//       if (res.ok) {
//         const newSpot = await res.json();
//         dispatch(createSpot(newSpot));
//         return newSpot;
//       } else {
//         const errors = await res.json();
//         return errors;
//       }
// }

/*----------------GET ALL SPOTS ----------------------*/
export const fetchGetAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const getAllSpotsDetails = await res.json();
        dispatch(getAllSpots(getAllSpotsDetails));
      } else {
        const errors = await res.json();
        return errors;
      }
  };

/*----------------GET SPOT BY ID ----------------------*/
// export const fetchGetSpotById = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}`);

//     if (res.ok) {
//         const getSpotsByIdDetails = await res.json();
//         dispatch(getSpotById(getSpotsByIdDetails));
//       } else {
//         const errors = await res.json();
//         return errors;
//       }
//     };

/*----------------UPDATE SPOT ----------------------*/
// export const fetchUpdateSpot = (spot) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spot.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(spot),
//     });

//     if (res.ok) {
//       const updatedSpot = await res.json();
//       dispatch(updateSpot(updatedSpot));
//       return updatedSpot;
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   };


/*----------------DELETE SPOT ----------------------*/
// export const fetchDeleteSpot = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       dispatch(deleteSpot(spotId));
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   };









//reducer
const spotsReducer = (state = {}, action) => {
    switch(action.type){
        // case CREATE_SPOT:
        //     return {

        //     };
        // case GET_SPOT_BY_ID: {
        //     const newState = { ...state };
        //     const spot = action.payload;
        //     newState.spots = spot;
        //     return newState.spots;
        // }
        case GET_ALL_SPOTS: {
            const newState = { ...state,  };
            console.log('THIS IS ACTION', action)
            const spots = action.payload.Spots;
            newState.Spots = spots.reduce((newAllSpots, spot) => {
                newAllSpots[spot.id] = {...spot}; //making sure to have id equal to each spot -> flattening
                return newAllSpots;
            }, {});
            return newState;
        }
        // case UPDATE_SPOT:
        //     return {

        //     };
        // case DELETE_SPOT:
        //     return {

        //     };
        default:
            return state;
    }
}

export default spotsReducer;
