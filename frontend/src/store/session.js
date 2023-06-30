import {csrfFetch} from './csrf'

/** Action Type Constants*/
export const SET_USER = 'session/setUser'
export const REMOVE_USER = 'session/removeUser'
// export const ADD_USER = 'session/addUser'

/** Action Creators*/
export const setUser = (user) => { //return this way
    console.log('SET USER ACTION CREATOR')
    return {
        type: SET_USER,
        payload: user
    };
};

export const noSessionUser = () => ({ //or return this way using ()
    type: REMOVE_USER
})

// export const addUser = (user) => ({
//     type: ADD_USER,
//     payload: user
// })

/** Thunk Action Creators */

export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    console.log("THUNK: THIS IS SIGNUP")
    const { username, firstName, lastName, email, password } = user;
    console.log("DATA IN THUNK")
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    console.log('THUNK RESPONSE', response )
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };


/** Reducer*/
const initialState = {user: null}

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
        case SET_USER:
            console.log('CASE')
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        // case ADD_USER:
        //     console.log("CASE HERE")
        //     newState = Object.assign({}, state);
        //     newState.user = action.payload;
        //     return newState;
        default:
            return state
    }
}

export default sessionReducer;
