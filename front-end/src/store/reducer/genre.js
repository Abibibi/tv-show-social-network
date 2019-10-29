// - initialState
const initialState = {
  genres: [],
};

// - Actions Types
export const DISPLAY_GENRE = 'DISPLAY_GENRE';
export const FETCH_GENRE = 'FETCH_GENRE';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_GENRE:
      return {
        ...state,
        genres: action.genres,
      };
    default:
      return state;
  }
};

// - Actions Creators
export const fetchGenre = () => ({
  type: FETCH_GENRE,
});

export const displayGenre = (genres) => ({
  type: DISPLAY_GENRE,
  genres,
});

// - Selectors

// - Export
export default reducer;
