// - initialState
const initialState = {
  seriesOneGenre: {},
  seriesByGenre: [],
  // to gather info about one show (id, title, year, summary, trailer and slug)
  oneSerie: {},
  // to gather info about directors related to one show
  directors: [],
  // to gather info about actors related to one show
  actors: [],
  // to gather info about the genre of one show
  genre: {},
  // to gather info about reviews posted about one show
  reviews: [],
  seriesAndRelatedGenres: [],
};

// - Actions Types
export const GET_SERIES_BY_GENRE = 'GET_SERIES_BY_GENRE';
const DISPLAY_SERIES_BY_GENRE = 'DISPLAY_SERIES_BY_GENRE';
export const GET_SERIE_DETAILS = 'GET_SERIE_DETAILS';
const DISPLAY_SERIE_DETAILS = 'DISPLAY_SERIE_DETAILS';
export const RECEIVE_REVIEW_ON_SHOW_PAGE = 'RECEIVE_REVIEW_ON_SHOW_PAGE';
export const FETCH_SERIES_AND_RELATED_GENRES = 'FETCH_SERIES_AND_RELATED_GENRES';
const SERIES_AND_RELATED_GENRES_IN_STATE = 'SERIES_AND_RELATED_GENRES_IN_STATE';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_SERIES_BY_GENRE:
      return {
        ...state,
        seriesOneGenre: action.genre,
        seriesByGenre: action.genre.shows,
      };
    case DISPLAY_SERIE_DETAILS:
      return {
        ...state,
        oneSerie: action.serieDetails,
        directors: action.serieDetails.directors,
        actors: action.serieDetails.actors,
        genre: action.serieDetails.genre,
        reviews: action.serieDetails.reviews,
      };
    case RECEIVE_REVIEW_ON_SHOW_PAGE:
      return {
        ...state,
        reviews: [
          ...state.reviews,
          action.review,
        ],
      };
    case SERIES_AND_RELATED_GENRES_IN_STATE:
      return {
        ...state,
        seriesAndRelatedGenres: action.seriesRelatedGenres,
      };
    default:
      return state;
  }
};

// - Actions Creators
export const getSeriesByGenre = () => ({
  type: GET_SERIES_BY_GENRE,
});

export const displaySeriesByGenre = (genre) => ({
  type: DISPLAY_SERIES_BY_GENRE,
  genre,
});

export const getSerieDetails = () => ({
  type: GET_SERIE_DETAILS,
});

export const displaySerieDetails = (serieDetails) => ({
  type: DISPLAY_SERIE_DETAILS,
  serieDetails,
});

export const receiveReviewOnShowPage = (review) => ({
  type: RECEIVE_REVIEW_ON_SHOW_PAGE,
  review,
});

export const fetchSeriesAndRelatedGenres = () => ({
  type: FETCH_SERIES_AND_RELATED_GENRES,
});

export const seriesAndRelatedGenresInState = (seriesRelatedGenres) => ({
  type: SERIES_AND_RELATED_GENRES_IN_STATE,
  seriesRelatedGenres,
});

// - Selectors

// - Export
export default reducer;
