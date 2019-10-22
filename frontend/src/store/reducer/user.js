// - initialState
const initialState = {
  firstname: '',
  lastname: '',
  handle: '',
  signUpEmail: '',
  signUpPassword: '',
  signInEmail: '',
  signInPassword: '',
  logged: false,
};

// - Actions Types
const CHANGE_VALUE = 'CHANGE_VALUE';
export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const DO_SIGNOUT = 'DO_SIGNOUT';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case DO_SIGNUP:
      return {
        ...state,
        firstname: '',
        lastname: '',
        handle: '',
        signUpEmail: '',
        signUpPassword: '',
      };
    case DO_SIGNIN:
      return {
        ...state,
        firstname: '',
        lastname: '',
        handle: '',
        signInEmail: '',
        signInPassword: '',
      };
    case DO_SIGNOUT:
      return {
        ...state,
        logged: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        logged:true,
      }
    default:
      return state;
  }
};

// - Actions Creators
export const changeValue = (name, value) => ({
  type: CHANGE_VALUE,
  name,
  value,
});

export const doSignUp = () => ({
  type: DO_SIGNUP,
});

export const doSignIn = () => ({
  type: DO_SIGNIN,
});

export const doSignOut = () => ({
  type: DO_SIGNOUT,
});

export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS,
});

// - Selectors

// - Export
export default reducer;
