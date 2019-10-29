import axios from 'axios';

import { displayGenre, FETCH_GENRE } from 'src/store/reducer/genre';

const genreMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_GENRE: {
      console.log('Je veux afficher tous les genres');

      const state = store.getState();

      console.log(state.genre.genres);

      axios.get('http://localhost:5000/genres/')
        .then((response) => {
          console.log('Je récupère bien mes genres', response.data);
          const genreAction = displayGenre(response.data);
          store.dispatch(genreAction);
          
        })
        .catch((error) => {
          console.log('error', error);
        });

      next(action);
      break;
    }
    default:
      console.log('cette action ne m\'intéresse pas je la laisse paser');
      next(action);
  }
};

export default genreMiddleware;
