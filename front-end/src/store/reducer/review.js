// - initialState
const initialState = {
  allShows: [],
  allReviews: [],
  reviewShow: '',
  reviewContent: '',
  reviewContentShowPage: '',
  changedInputShowId: '',
};

// - Actions Types
export const GET_HOME_SHOWS = 'GET_HOME_SHOWS';
export const GET_HOME_REVIEWS = 'GET_HOME_REVIEWS';
const DISPLAY_REVIEWS = 'DISPLAY_REVIEWS';
const DISPLAY_SHOWS = 'DISPLAY_SHOWS';
export const POST_REVIEW = 'POST_REVIEW';
const CHANGE_SHOW_VALUE = 'CHANGE_SHOW_VALUE';
const CHANGE_REVIEW_ON_SHOW_PAGE = 'CHANGE_REVIEW_ON_SHOW_PAGE';
const CHANGE_REVIEW = 'CHANGE_REVIEW';
export const REVIEW_WEB_SOCKET = 'REVIEW_WEB_SOCKET';
const RECEIVE_REVIEW = 'RECEIVE_REVIEW';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_REVIEWS:
      return {
        ...state,
        allReviews: action.allReviews,
      };
    case DISPLAY_SHOWS:
      return {
        ...state,
        allShows: action.allShows,
      };
    case CHANGE_SHOW_VALUE:
      return {
        ...state,
        reviewShow: action.value,
      };
    case CHANGE_REVIEW:
      return {
        ...state,
        reviewContent: action.value,
      };
    case CHANGE_REVIEW_ON_SHOW_PAGE:
      return {
        ...state,
        reviewContentShowPage: action.value,
        changedInputShowId: action.id,
      };
    case POST_REVIEW:
      return {
        ...state,
        reviewShow: '',
        reviewContent: '',
        reviewContentShowPage: '',
      };
    case RECEIVE_REVIEW:
      return {
        ...state,
        allReviews: [
          ...state.allReviews,
          action.review,
        ],
      };
    default:
      return state;
  }
};

// - Selectors


// - Actions Creators
export const getHomeReviews = () => ({
  type: GET_HOME_REVIEWS,
});

export const getHomeShows = () => ({
  type: GET_HOME_SHOWS,
});

export const displayReviews = (allReviews) => ({
  type: DISPLAY_REVIEWS,
  allReviews,
});

export const displayShows = (allShows) => ({
  type: DISPLAY_SHOWS,
  allShows,
});

export const changeShowValue = (value) => ({
  type: CHANGE_SHOW_VALUE,
  value,
});

export const changeReview = (value) => ({
  type: CHANGE_REVIEW,
  value,
});

export const changeReviewOnShowPage = (id, value) => ({
  type: CHANGE_REVIEW_ON_SHOW_PAGE,
  id,
  value,
});

export const postReview = () => ({
  type: POST_REVIEW,
});

export const reviewWebsocketConnect = () => ({
  type: REVIEW_WEB_SOCKET,
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review,
});

// - Export
export default reducer;
