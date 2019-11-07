// - initialState
const initialState = {
  searchSeriesInput: '',
  allShowsFiltered: [],
  searchDone: false,
};

// - Actions Types
const CHANGE_INPUT_SEARCH = 'CHANGE_INPUT_SEARCH';
export const FIND_SERIES = 'FIND_SERIES';
const RECEIVE_SERIES_FILTERED = 'RECEIVE_SERIES_FILTERED';
export const FIND_SERIES_BY_HANDLE = 'FIND_SERIES_BY_HANDLE';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_SEARCH:
      return {
        ...state,
        searchSeriesInput: action.value,
      };
    case RECEIVE_SERIES_FILTERED:
      return {
        ...state,
        allShowsFiltered: action.series,
        searchDone: false,
      };
    case FIND_SERIES:
      return {
        ...state,
        searchSeriesInput: '',
        searchDone: true,
      };
    case FIND_SERIES_BY_HANDLE:
      return {
        ...state,
        searchDone: true,
      };
    default:
      return state;
  }
};

// - Actions Creators
export const changeInputSearch = (value) => ({
  type: CHANGE_INPUT_SEARCH,
  value,
});

export const findSeries = () => ({
  type: FIND_SERIES,
});

export const findSeriesByHandle = () => ({
  type: FIND_SERIES_BY_HANDLE,
});

export const receiveSeriesFiltered = (series) => ({
  type: RECEIVE_SERIES_FILTERED,
  series,
});

// - Selectors

// - Export
export default reducer;
