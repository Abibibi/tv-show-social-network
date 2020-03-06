import axios from 'axios';
import io from 'socket.io-client';

import {
  WEB_SOCKET,
  ADD_MESSAGE,
  GET_MESSAGES,
  displayMessages,
  receiveMessage,
} from 'src/store/reducer/chat';


var socket = io.connect('https://tv-show-social-network.herokuapp.com');


const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      console.log('Je veux envoyer un message dans la BDD');
      const state = store.getState();

      const userId = state.user.sessionUserId;

      const content = state.chat.chatMessage;

      const handle = state.user.sessionUserHandle;
      
      console.log(content);

      // newMessage template has to be the same as the template of messages
      // received in messages/ API.
      const newMessage = {
        createdAt: new Date(),
        content,
        user: {
          id: userId,
          handle,
        },
      };

      socket.emit('send_message', newMessage);
      
      axios.post('https://tv-show-social-network.herokuapp.com/chatmessages/add', newMessage, { withCredentials: true })
        .then((response) => {
          console.log('Le message a bien été enregistré dans la BDD', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
      

      next(action);
      break;
    }
    case GET_MESSAGES: {
      axios.get('https://tv-show-social-network.herokuapp.com/chatmessages/', { withCredentials: true })
        .then((response) => {
          console.log('Je récupère l\'historique des messages du chat', response.data);
          const messageAction = displayMessages(response.data);
          store.dispatch(messageAction);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case WEB_SOCKET: {
      socket.on('send_message', (message) => {
        // console.log(message);
        store.dispatch(receiveMessage(message));
      });

      break;
    }
    default:
      next(action);
  }
};

export default chatMiddleware;
