import {csrfFetch} from './csrf'

//action type- CRUD
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId'
const DELETE_REVIEW = 'review/deleteReview'

//action function
const getReviewsBySpotId = (reviews) => ({
    type: GET_REVIEWS_BY_SPOT_ID,
    payload: reviews
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
});


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

/*----------------DELETE REVIEW BY REVIEW ID ----------------------*/
export const fetchDeleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      dispatch(deleteReview(reviewId))
      return true;
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
            reviews.forEach((review) => { //flattened it so the each index and id num will match
                newState[review.id] = {...review}
            })
            return newState;
        }
        case DELETE_REVIEW:
            const newState = {...state};
            const reviewId = action.payload
            delete newState[reviewId]
            return newState
        default:
            return state;
    }
}

export default reviewsReducer;
