import axios from 'axios';

import {
  POST_REVIEW,
  REVIEW_WEB_SOCKET,
  receiveReview,
} from 'src/store/reducer/review';

import { receiveReviewOnShowPage } from 'src/store/reducer/serie';

let socket;


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
      axios.post('http://localhost:5000/reviews/add', newReview, { withCredentials: true })
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
      socket = window.io('http://localhost:5000');
      
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
