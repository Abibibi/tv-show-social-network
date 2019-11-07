// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Search from 'src/components/Header/Nav/Search';
import { changeInputSearch, findSeries, findSeriesByHandle } from 'src/store/reducer/search';

/* === State (données) === */
const mapStateToProps = (state) => ({
  searchSeriesInput: state.search.searchSeriesInput,
});

/* === Actions === */
const mapDispatchToProps = (dispatch) => ({
  changeValue: (value) => {
    const action = changeInputSearch(value);
    dispatch(action);
  },
  submitSearch: () => {
    const action = findSeries();
    dispatch(action);
  },

  submitSearchByHandle: () => {
    const action = findSeriesByHandle();
    dispatch(action);
  },
});

// Container
const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

// == Export
export default SearchContainer;
