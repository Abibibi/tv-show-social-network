// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import reducer from 'src/store/reducer';
import userMiddleware from 'src/store/middlewares/userMiddleware';
import genreMiddleware from 'src/store/middlewares/genreMiddleware';
import serieMiddleware from 'src/store/middlewares/serieMiddleware';
import chatMiddleware from 'src/store/middlewares/chatMiddleware';
import homeMiddleware from 'src/store/middlewares/homeMiddleware';
import reviewMiddleware from 'src/store/middlewares/reviewMiddleware';
import searchMiddleware from 'src/store/middlewares/searchMiddleware';
import friendMiddleware from 'src/store/middlewares/friendMiddleware';
import { websocketConnect } from 'src/store/reducer/chat';
import { reviewWebsocketConnect } from 'src/store/reducer/review';

// == Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    userMiddleware,
    genreMiddleware,
    serieMiddleware,
    chatMiddleware,
    homeMiddleware,
    reviewMiddleware,
    searchMiddleware,
    friendMiddleware,
    // secondMiddleware,
  ),
);

const store = createStore(
  reducer,
  // preloadedState,
  enhancers,
);

store.dispatch(websocketConnect());
store.dispatch(reviewWebsocketConnect());

// == Export
export default store;
