import axios from 'axios';

import {
  GET_SERIES_BY_GENRE,
  displaySeriesByGenre,
  GET_SERIE_DETAILS,
  displaySerieDetails,
} from 'src/store/reducer/serie';

const serieMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_SERIES_BY_GENRE: {
      console.log('Je veux envoyer le nom du genre au back');

      const genreSlug = window.location.pathname.split('/').pop();
    

      axios.get(`http://localhost:5000/genres/${genreSlug}`)
        .then((response) => {
          console.log('Je récupère bien mes séries', response.data.shows);
          
          const allGenreSeries = response.data.shows;
          const displaySeriesAction = displaySeriesByGenre(allGenreSeries);
          store.dispatch(displaySeriesAction);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case GET_SERIE_DETAILS: {
      console.log('Je veux envoyer le nom de la série au back');

      const serieSlug = window.location.pathname.split('/').pop();
    

      axios.get(`http://localhost:5000/shows/${serieSlug}`)
        .then((response) => {
          console.log('Je récupère bien le détail de ma série', response.data);
          
          const oneSerieDetails = response.data;
          const displayOneSerieAction = displaySerieDetails(oneSerieDetails);
          store.dispatch(displayOneSerieAction);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    default:
      console.log('cette action ne m\'intéresse pas je la laisse passer');
      next(action);
  }
};

export default serieMiddleware;
