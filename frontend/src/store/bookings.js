import {csrfFetch} from './csrf'

//GET ALL CURRENT USERS BOOKINGS
//GET ALL BOOKINGS FOR SPOT BASED ON SPOT ID
//CREATE A BOOKING FROM A SPOT BASED ON SPOT ID
//EDIT BOOKING
//DELETE BOOKING

//TYPE----------------------------------------------------------------------------------------------//
const GET_CURRENT_USER_BOOKINGS = 'bookings/GET_CURRENT_USER_BOOKINGS'


//ACTION----------------------------------------------------------------------------------------------//
const actionGetCurrentUserBookings = (bookings) => ({
    type: GET_CURRENT_USER_BOOKINGS,
    bookings,
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

//REDUCER----------------------------------------------------------------------------------------------//
const initialState = { currentUserBookings: {} , spotBookings: {}, singleBooking: {}}

const bookingsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CURRENT_USER_BOOKINGS: {
            const newState = { ...state };
            const userBookings = action.bookings
            userBookings.forEach((booking) => {
                newState.currentUserBookings[booking.id] = booking;
            });
            return newState
        }


        default:
            return state;
    }
}

export default bookingsReducer;
