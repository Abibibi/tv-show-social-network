import axios from 'axios';
import io from 'socket.io-client';

import {
  POST_REVIEW,
  REVIEW_WEB_SOCKET,
  receiveReview,
} from 'src/store/reducer/review';

import { receiveReviewOnShowPage } from 'src/store/reducer/serie';

var socket = io.connect('https://tv-show-social-network.herokuapp.com');


const reviewMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case POST_REVIEW: {
      console.log('Je veux envoyer un avis dans la BDD');

      const state = store.getState();

      const userId = state.user.sessionUserId;

      const handle = state.user.sessionUserHandle;

      const content = state.review.reviewContent || state.review.reviewContentShowPage;

      const showTitle = state.review.reviewShow || state.serie.oneSerie.title;

      // newMessage template has to be the same as the template of messages
      // received in messages/ API for websocket purposes
      const newReview = {
        createdAt: new Date(),
        content,
        user: {
          id: userId,
          handle,
        },
        show: {
          title: showTitle,
        },
      };

      // someone posted a review and it needs to be dealt with via WebSocket, 
      // under the conditions specified to client when they get connected via WEBSOCKET 
      // (conditions are in REVIEW_WEB_SOCKET case below)
      socket.emit('post_review', newReview);
      
      // someone posted a review and it needs to be added in DB
      axios.post('https://tv-show-social-network.herokuapp.com/reviews/add', newReview, { withCredentials: true })
        .then((response) => {
          console.log('L\'avis a bien été enregistré dans la BDD', response.data);
          // action adds new review in reviews state of the show page
          const reviewShowPageAction = receiveReviewOnShowPage(newReview);
          store.dispatch(reviewShowPageAction);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    // Conditions when client gets connected via WebSocket
    // (at the creation of the store, thus at the beginning of the application)
    case REVIEW_WEB_SOCKET: {     
      // if new review is posted via WebSocket,
      socket.on('post_review', (review) => {
        // new review needs to be added into newsfeed reviews state
        store.dispatch(receiveReview(review));
        // furthermore, server-side, it is planned that the review is sent to all connected clients
      });
      break;
    }
    default:
      next(action);
  }
};

export default reviewMiddleware;
