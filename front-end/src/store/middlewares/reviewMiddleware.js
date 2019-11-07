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
    
      console.log(content);

      // newMessage template has to be the same as the template of messages
      // received in messages/ API for websockets purposes
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
      
      axios.post('http://localhost:5000/reviews/add', newReview)
        .then((response) => {
          console.log('L\'avis a bien été enregistré dans la BDD', response.data);
          socket.emit('post_review', newReview);
          const reviewShowPageAction = receiveReviewOnShowPage(response.data);
          store.dispatch(reviewShowPageAction);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case REVIEW_WEB_SOCKET: {
      socket = window.io('http://localhost:5000');
      
      socket.on('post_review', (review) => {
        store.dispatch(receiveReview(review));
      });
      break;
    }
    default:
      next(action);
  }
};

export default reviewMiddleware;
