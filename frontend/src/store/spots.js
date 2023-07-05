//source/store/spots.js


// frontend/src/components/SpotDetailPage.js
import {csrfFetch} from './csrf'

//action type- CRUD
const CREATE_SPOT = 'spots/createSpot'
const GET_SPOT_BY_ID = 'spots/getSpotById'
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SPOTS_BY_USER = 'spots/getSpotsByUser'
const CLEAR_SPOTS_BY_USER ='spots/clearSpotsByUser'
// const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'

// action function
const createSpot = (spot) => ({
    type: CREATE_SPOT,
    payload: spot
});

const getSpotById = (spotId) => ({
    type: GET_SPOT_BY_ID,
    payload: spotId
});

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS, //already an obj
    payload: spots
});

const getSpotsByUser = (spotsOfUser) => ({
  type: GET_SPOTS_BY_USER,
  payload: spotsOfUser
})

export const actionClearSpotsByUser = () => ({
  type: CLEAR_SPOTS_BY_USER
})

// const updateSpot = () => ({
//     type: UPDATE_SPOT,
//     // payload
// });

const deleteSpot = (toDelete) => ({
    type: DELETE_SPOT,
    payload: toDelete
});


//thunks
/*----------------CREATE A SPOT ----------------------*/
export const fetchCreateSpot = (spotFormData) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotFormData),
      });

      if (res.ok) {
        const newSpot = await res.json();
        dispatch(createSpot(newSpot));
        return newSpot;
      } else {
        const errors = await res.json();
        return errors;
      }
}

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
export const fetchGetSpotById = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const getSpotsByIdDetails = await res.json();
        dispatch(getSpotById(getSpotsByIdDetails));
      } else {
        const errors = await res.json();
        return errors;
      }
    };

/*----------------GET SPOTS BY USER ----------------------*/

export const fetchGetSpotsByUser = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);


  if (res.ok) {
      const getSpotsByUserDetails = await res.json();
      dispatch(getSpotsByUser(getSpotsByUserDetails));
    } else {
      const errors = await res.json();
      return errors;
    }
  };

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
export const fetchDeleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      dispatch(deleteSpot(spotId));
    } else {
      const errors = await res.json();
      return errors;
    }
  };



const initialState = { spots: {} , userSpots: {}}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_SPOT: {
          // const newState = {...state}
          const newSpot = action.payload
          // newState[action.payload.id] = newSpot
          // return newState
          return {...state, spots:{...state.spots, [newSpot.id]: newSpot}}
        }
        case GET_SPOT_BY_ID: {
            const newState = { ...state };
            const spot = action.payload;
            newState.singleSpot = spot;
            return newState;
        }
        case GET_SPOTS_BY_USER: {
          const newState = { ...state };
          action.payload.Spots.forEach((spot) => {
            newState.userSpots[spot.id] = spot;
          });
          return newState; //getting back an obj of arrays
      }
      case CLEAR_SPOTS_BY_USER:{
        const newState = {...state}
        newState.userSpots = {}
        return newState
      }
        case GET_ALL_SPOTS: {
            const newState = { ...state };
            const spots = action.payload.Spots;
            spots.forEach((spot) => {
              newState.spots[spot.id] = spot;
            });
            return newState;
          }
        // case UPDATE_SPOT:
        //     return {

        //     };
        case DELETE_SPOT:
            return {

            };
        default:
            return state;
    }
}

export default spotsReducer;
