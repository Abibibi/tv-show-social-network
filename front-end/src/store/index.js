// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import reducer from 'src/store/reducer';
import userAuthMiddleware from 'src/store/middlewares/userAuthMiddleware';
import genreMiddleware from 'src/store/middlewares/genreMiddleware';
import serieMiddleware from 'src/store/middlewares/serieMiddleware';
import chatMiddleware from 'src/store/middlewares/chatMiddleware';
import { websocketConnect } from 'src/store/reducer/chat';

// == Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    userAuthMiddleware,
    genreMiddleware,
    serieMiddleware,
    chatMiddleware,
    // secondMiddleware,
  ),
);

const store = createStore(
  reducer,
  // preloadedState,
  enhancers,
);

store.dispatch(websocketConnect());

// == Export
export default store;
