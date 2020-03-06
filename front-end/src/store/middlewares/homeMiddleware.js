import axios from 'axios';

import {
  GET_HOME_REVIEWS,
  GET_HOME_SHOWS,
  displayReviews,
  displayShows,
} from 'src/store/reducer/review';

const homeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_HOME_REVIEWS: {
      console.log('Sur la page d\'accueil, je veux voir les avis postés sur chaque série');

      axios.get('https://tv-show-social-network.herokuapp.com/reviews/', { withCredentials: true })
        .then((response) => {
          console.log('Je récupère bien les avis sur chaque série', response.data);
          
          const allReviewsAction = response.data;
          const showAllReviews = displayReviews(allReviewsAction);
          store.dispatch(showAllReviews);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case GET_HOME_SHOWS: {
      console.log('Sur la page d\'accueil, je veux pouvoir sélectionner une série parmi toutes les séries');

      axios.get('https://tv-show-social-network.herokuapp.com/shows/', { withCredentials: true })
        .then((response) => {
          console.log('Je récupère bien toutes les séries', response.data);
          
          const allShowsAction = response.data;
          const showAllShows = displayShows(allShowsAction);
          store.dispatch(showAllShows);
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

export default homeMiddleware;
