import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  changeValue,
  submitSearch,
  searchSeriesInput,
  submitSearchByHandle,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    changeValue(value);
    submitSearchByHandle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSearch();
  };
  return (      
    <form className="form-search" onSubmit={handleSubmit}>
      <input value={searchSeriesInput} onChange={handleChange} className="search__input" type="text" placeholder="Recherche une série..." />
    </form>
  );
};

Search.propTypes = {
  changeValue: PropTypes.func.isRequired,
  searchSeriesInput: PropTypes.string.isRequired,
  submitSearch: PropTypes.func.isRequired,
  submitSearchByHandle: PropTypes.func.isRequired,
};

export default Search;
