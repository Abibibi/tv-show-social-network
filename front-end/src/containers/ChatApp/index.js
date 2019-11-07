// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import ChatApp from 'src/components/ChatApp';
import { messageTyped, addMessage, getMessages } from 'src/store/reducer/chat';

// Action Creators

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  messages: state.chat.messages,
  chatMessage: state.chat.chatMessage,
  sessionUserId: state.user.sessionUserId,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  newMessage: (value) => {
    const action = messageTyped(value);
    dispatch(action);
  },

  submitMessage: () => {
    const action = addMessage();
    dispatch(action);
  },

  fetchMessages: () => {
    const action = getMessages();
    dispatch(action);
  },
});

// Container
const ChatAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatApp);

// == Export
export default ChatAppContainer;
