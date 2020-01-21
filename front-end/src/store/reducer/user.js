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
  sessionUserId: '',
  sessionUserHandle: '',
  sessionUserSlug: '',
  ownProfile: {},
  reviews: [],
  relationships: [],
};

// - Actions Types
export const IS_AUTH = 'IS_AUTH';
const USER_ALREADY_AUTHENTICATED= 'USER_ALREADY_AUTHENTICATED';
const CHANGE_VALUE = 'CHANGE_VALUE';
export const DO_SIGNUP = 'DO_SIGNUP';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const DO_SIGNIN = 'DO_SIGNIN';
export const DO_SIGNOUT = 'DO_SIGNOUT';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_FAIL = 'SIGNIN_FAIL';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const GET_OWN_PROFILE = 'GET_OWN_PROFILE';
export const RECEIVE_OWN_PROFILE = 'RECEIVE_OWN_PROFILE';
const DO_FOLLOW = 'DO_FOLLOW';
const DO_UNFOLLOW = 'DO_UNFOLLOW';


// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_ALREADY_AUTHENTICATED:
      return {
        ...state,
        logged: true,
        sessionUserHandle: action.userSessionData.handle,
        sessionUserSlug: action.userSessionData.slug,
        sessionUserId: action.userSessionData.id,
      };
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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        registered: true,
        registerFail: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        registerFail: true,
        registered: false,
      };
    case DO_SIGNIN:
      return {
        ...state,
        signInEmail: '',
        signInPassword: '',
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        logged: true,
        signedIn: true,
        signInFail: false,
        sessionUserHandle: action.userSessionData.handle,
        sessionUserSlug: action.userSessionData.slug,
        sessionUserId: action.userSessionData.id,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        signInFail: true,
        signedIn: false,
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        logged: false,
        signedIn: false,
        sessionUserHandle: '',
        sessionUserSlug: '',
        sessionUserId: '',
      };  
    case RECEIVE_OWN_PROFILE:
      return {
        ...state,
        ownProfile: action.profile,
        reviews: action.profile.reviews,
        relationships: action.profile.relations,
      };
    case DO_FOLLOW:
      return {
        ...state,
        relationships: [
          ...state.relationships,
          action.newRelationship,
        ],
      };
    case DO_UNFOLLOW:
      return {
        ...state,
        relationships: [
          ...state.relationships.filter((relationship) => relationship.id !== action.relationshipIdentifier),
        ],
      };
    default:
      return state;
  }
};

// - Actions Creators
export const isAuth = () => ({
  type: IS_AUTH,
});

export const userAlreadyAuthenticated = (userSessionData) => ({
  type: USER_ALREADY_AUTHENTICATED,
  userSessionData,
})

export const changeValue = (name, value) => ({
  type: CHANGE_VALUE,
  name,
  value,
});

export const doSignUp = () => ({
  type: DO_SIGNUP,
});

export const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signUpFail = () => ({
  type: SIGNUP_FAIL,
});

export const doSignIn = () => ({
  type: DO_SIGNIN,
});

export const doSignOut = () => ({
  type: DO_SIGNOUT,
});

export const signInSuccess = (userSessionData) => ({
  type: SIGNIN_SUCCESS,
  userSessionData,
});

export const signInFail = () => ({
  type: SIGNIN_FAIL,
});

export const signOutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
});

export const getOwnProfile = () => ({
  type: GET_OWN_PROFILE,
});

export const receiveOwnProfile = (profile) => ({
  type: RECEIVE_OWN_PROFILE,
  profile,
});

export const doFollow = (newRelationship) => ({
  type: DO_FOLLOW,
  newRelationship,
});

export const doUnfollow = (relationshipIdentifier) => ({
  type: DO_UNFOLLOW,
  relationshipIdentifier,
});

// - Selectors

// - Export
export default reducer;
