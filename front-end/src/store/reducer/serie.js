// - initialState
const initialState = {
  seriesByGenre: [],
  oneSerie: {},
  directors: [],
  actors: [],
  genre: {},
};

// - Actions Types
export const GET_SERIES_BY_GENRE = 'GET_SERIES_BY_GENRE';
const DISPLAY_SERIES_BY_GENRE = 'DISPLAY_SERIES_BY_GENRE';
export const GET_SERIE_DETAILS = 'GET_SERIE_DETAILS';
const DISPLAY_SERIE_DETAILS = 'DISPLAY_SERIE_DETAILS';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_SERIES_BY_GENRE:
      return {
        ...state,
        seriesByGenre: action.genreSeries,
      };
    case DISPLAY_SERIE_DETAILS:
      return {
        ...state,
        oneSerie: action.serieDetails,
        directors: action.serieDetails.directors,
        actors: action.serieDetails.actors,
        genre: action.serieDetails.genre,
      };
    default:
      return state;
  }
};

// - Actions Creators
export const getSeriesByGenre = () => ({
  type: GET_SERIES_BY_GENRE,
});

export const displaySeriesByGenre = (genreSeries) => ({
  type: DISPLAY_SERIES_BY_GENRE,
  genreSeries,
});

export const getSerieDetails = () => ({
  type: GET_SERIE_DETAILS,
});

export const displaySerieDetails = (serieDetails) => ({
  type: DISPLAY_SERIE_DETAILS,
  serieDetails,
});

// - Selectors

// - Export
export default reducer;
