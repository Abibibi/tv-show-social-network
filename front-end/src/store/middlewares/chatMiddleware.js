import axios from 'axios';

import {
  WEB_SOCKET,
  ADD_MESSAGE,
  GET_MESSAGES,
  displayMessages,
  receiveMessage,
} from 'src/store/reducer/chat';

let socket;

const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      console.log('Je veux envoyer un message dans la BDD');

      const state = store.getState();

      const userId = state.user.sessionUserId;

      const content = state.chat.chatMessage;

      const handle = state.user.loggedUserHandle;
      
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
      
      axios.post('http://localhost:5000/messages/add', newMessage)
        .then((response) => {
          console.log('Le message a bien été enregistré dans la BDD', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
      
      socket.emit('send_message', newMessage);

      next(action);
      break;
    }
    case GET_MESSAGES: {
      axios.get('http://localhost:5000/messages/')
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
      socket = window.io('http://localhost:5000');
      socket.on('send_message', (message) => {
        // console.log(message);
        store.dispatch(receiveMessage(message));
      });
      console.log('Le message est bien revenu');
      break;
    }
    default:
      console.log('cette action ne m\'intéresse pas je la laisse passer');
      next(action);
  }
};

export default chatMiddleware;
