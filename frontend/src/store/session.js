import {csrfFetch} from './csrf'

/** Action Type Constants*/
export const SET_USER = 'session/setUser'
export const REMOVE_USER = 'session/removeUser'


/** Action Creators*/
export const setUser = (user) => { //return this way
    return {
        type: SET_USER,
        payload: user
    };
};

export const removeUser = () => ({ //or return this way using ()
    type: REMOVE_USER
})

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
    const { username, firstName, lastName, email, password } = user;
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
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

/** Reducer*/
const initialState = {user: null}

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer;
