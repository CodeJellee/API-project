import {csrfFetch} from './csrf'

//action type- CRUD
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId'

//action function
const getReviewsBySpotId = (reviews) => ({
    type: GET_REVIEWS_BY_SPOT_ID,
    payload: reviews
})


//thunks
/*----------------GET REVIEWS BY SPOT ID ----------------------*/
export const fetchGetReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const getReviewsBySpotIdDetails = await res.json();
        dispatch(getReviewsBySpotId(getReviewsBySpotIdDetails));
      } else {
        const errors = await res.json();
        return errors;
      }
    };



//reducer
const reviewsReducer = (state ={}, action) => {
    switch(action.type){
        case GET_REVIEWS_BY_SPOT_ID: {
            const newState = {};
            const reviews = action.payload.Reviews;
            console.log(reviews)
            reviews.forEach((review) => { //flattened it so the each index and id num will match
                newState[review.id] = {...review}
            })
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
