import axios from 'axios';

import { FIND_SERIES, FIND_SERIES_BY_HANDLE, receiveSeriesFiltered } from 'src/store/reducer/search';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FIND_SERIES: {
      console.log('Je veux envoyer un mot pour effectuer une recherche');

      const state = store.getState();

      const wordSearchRequest = state.search.searchSeriesInput;

      const word = {
        wordSearch: wordSearchRequest,
      };

      console.log(wordSearchRequest);

      axios.post('https://tv-show-social-network.herokuapp.com/shows/search', word, { withCredentials: true })
        .then((response) => {
          console.log('Je recois les series en rapport avec le mot envoyé', response.data);
          store.dispatch(receiveSeriesFiltered(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case FIND_SERIES_BY_HANDLE: {
      console.log('Je veux envoyer un mot pour effectuer une recherche');

      const state = store.getState();

      const wordSearchRequest = state.search.searchSeriesInput;

      const word = {
        wordSearch: wordSearchRequest,
      };

      console.log(wordSearchRequest);

      axios.post('https://tv-show-social-network.herokuapp.com/shows/search', word, { withCredentials: true })
        .then((response) => {
          console.log('Je recois les series en rapport avec le mot envoyé', response.data);
          store.dispatch(receiveSeriesFiltered(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default searchMiddleware;
