
//action type- CRUD
const CREATE_SPOT = 'spots/createSpot'
const GET_SPOT = 'spots/getSpot'
const GET_ALL_SPOTS = 'spots/getAllSpots'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'

//action function
const createSpot = () => ({
    type: CREATE_SPOT,
    payload
});

const getSpot = () => ({
    type: GET_SPOT,
    payload
});

const getAllSpots = () => ({
    type: GET_ALL_SPOTS,
    payload
});

const updateSpot = () => ({
    type: UPDATE_SPOT,
    payload
});

const deleteSpot = () => ({
    type: DELETE_SPOT,
    payload
});


//thunks

//reducer
const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_SPOT:
            return {

            };
        case GET_SPOT:
            return {

            };
        case GET_ALL_SPOTS:
            return {

            };
        case UPDATE_SPOT:
            return {

            };
        case DELETE_SPOT:
            return {

            };
        default:
            return state;
    }
}

export default spotReducer;
