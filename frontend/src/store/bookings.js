import {csrfFetch} from './csrf'

//GET ALL CURRENT USERS BOOKINGS
//GET ALL BOOKINGS FOR SPOT BASED ON SPOT ID
//CREATE A BOOKING FROM A SPOT BASED ON SPOT ID
//EDIT BOOKING
//DELETE BOOKING

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_USER_BOOKINGS = 'bookings/GET_CURRENT_USER_BOOKINGS'
const GET_BOOKINGS_BY_SPOT_ID = 'bookings/GET_BOOKINGS_BY_SPOT_ID'


//ACTION----------------------------------------------------------------------------------------------//
const actionGetCurrentUserBookings = (bookings) => ({
    type: GET_CURRENT_USER_BOOKINGS,
    bookings,
})

const actionGetBookingsBySpotId = (bookings) => ({
    type: GET_BOOKINGS_BY_SPOT_ID,
    bookings
})

//THUNKS----------------------------------------------------------------------------------------------//
export const thunkGetCurrentUserBookings = () => async (dispatch) => {
    const res = await csrfFetch('/api/bookings/current');

    if (res.ok) {
        const currentUserBookings = await res.json();
        dispatch(actionGetCurrentUserBookings(currentUserBookings));
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetBookingsBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`api/spots/${spotId}/bookings`);

    if (res.ok) {
        const spotBookings = await res.json();
        dispatch(actionGetBookingsBySpotId(spotBookings));
    } else {
        const errors = await res.json();
        return errors;
    }
}

//REDUCER----------------------------------------------------------------------------------------------//
const initialState = { currentUserBookings: [] , spotBookings: [], singleBooking: []}

const bookingsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CURRENT_USER_BOOKINGS: {
            let newState = { ...state }
            newState.currentUserBookings = {};
            action.bookings.Bookings.forEach(
                (booking) => (newState.currentUserBookings[booking.id] = booking)
            )
            return newState
        }
        case GET_BOOKINGS_BY_SPOT_ID: {
            let newState = { ...state }
            newState.spotBookings = {};
            action.bookings.Bookings.forEach(
                (booking) => (newState.spotBookings[booking.id] = booking)
            )
            return newState
        }

        default:
            return state;
    }
}

export default bookingsReducer;
