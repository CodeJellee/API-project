import {csrfFetch} from './csrf'
//action type- CRUD
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId'
const DELETE_REVIEW = 'review/deleteReview'
const CREATE_REVIEW = 'review/createReview'

//action function
const getReviewsBySpotId = (reviews) => ({
    type: GET_REVIEWS_BY_SPOT_ID,
    payload: reviews
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
});

const functionCreateReview = (newReview) => ({
  type: CREATE_REVIEW,
  payload: newReview
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

  /*---------------- CREATE REVIEW ----------------------*/

  export const fetchCreateReview = (reviewData, spotId) => async (dispatch, getState) => {

  try {

    let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    })

    if(res.ok){
      const currentState = getState()
      const user = currentState.session
      const newReview = await res.json()
      newReview.User = user.user
      dispatch(functionCreateReview(newReview))
      return newReview

    }


  } catch (e) {
    const errors = await e.json();
    console.log(errors)
    return errors;

  }
}

//reducer
const reviewsReducer = (state ={}, action) => {
    switch(action.type){
        case CREATE_REVIEW: {
          const newState = {...state}
          const newReview = action.payload
          newState[newReview.id] = newReview
          return newState
        }
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
