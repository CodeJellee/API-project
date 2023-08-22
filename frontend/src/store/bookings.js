import {csrfFetch} from './csrf'

//GET ALL CURRENT USERS BOOKINGS
//GET ALL BOOKINGS FOR SPOT BASED ON SPOT ID
//CREATE A BOOKING FROM A SPOT BASED ON SPOT ID
//EDIT BOOKING
//DELETE BOOKING

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_USER_BOOKINGS = 'bookings/GET_CURRENT_USER_BOOKINGS'
const GET_BOOKINGS_BY_SPOT_ID = 'bookings/GET_BOOKINGS_BY_SPOT_ID'
const DELETE_BOOKING_BY_BOOKING_ID = 'bookings/DELETE_BOOKING_BY_BOOKING_ID'


//ACTION----------------------------------------------------------------------------------------------//
const actionGetCurrentUserBookings = (bookings) => ({
    type: GET_CURRENT_USER_BOOKINGS,
    bookings,
})

const actionGetBookingsBySpotId = (bookings) => ({
    type: GET_BOOKINGS_BY_SPOT_ID,
    bookings
})

const actionDeleteBookingByBookingId = (bookingId) => ({
    type: DELETE_BOOKING_BY_BOOKING_ID,
    bookingId,
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

export const thunkDeleteBookingByBookingId = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`api/bookings/${bookingId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(actionDeleteBookingByBookingId(bookingId))
        return true;
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
            const newState = { ...state }
            newState.currentUserBookings = {};
            action.bookings.Bookings.forEach(
                (booking) => (newState.currentUserBookings[booking.id] = booking)
            )
            return newState
        }
        case GET_BOOKINGS_BY_SPOT_ID: {
            const newState = { ...state }
            newState.spotBookings = {};
            action.bookings.Bookings.forEach(
                (booking) => (newState.spotBookings[booking.id] = booking)
            )
            return newState
        }
        case DELETE_BOOKING_BY_BOOKING_ID: {
            const newState = { ...state };
            const bookingId = action.bookingId;
            delete newState.currentUserBookings[bookingId]
            delete newState.singleBooking[bookingId]
            newState.singleBooking = {}
            return newState
        }

        default:
            return state;
    }
}

export default bookingsReducer;
