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
        logged: true,
      };
    case DO_SIGNOUT:
      return {
        ...state,
        logged: false,
      };
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

// - Selectors

// - Export
export default reducer;
