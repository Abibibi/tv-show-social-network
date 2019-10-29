import React, { useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import PropTypes from 'prop-types';

import './chatapp.scss';

const ChatApp = ({
  chatMessage,
  newMessage,
  submitMessage,
  fetchMessages,
  messages,
}) => {
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    newMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage();
  };

  return (
    <div className="chat">
      <div className="chat-title">Chat</div>
      <div className="chat-body">
        {messages.map(({
          id,
          content,
          createdAt,
          user: {
            id: userId,
            handle,
          },
        }) => {
          return (
            <div key={id} className="chat-body-messages">
              <div className="chat-body-message-author">{handle}</div>
              <p className="chat-body-message-content">{content}</p>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <form
          className="chat-footer-form"
          onSubmit={handleSubmit}
        >
          <input
            // value={/* une valeur venant du state */}
            // onChange={/* émettre une changement dans le state */}
            onChange={handleChange}
            value={chatMessage}
            className="chat-footer-form-input"
            placeholder="Saisissez votre message..."
          />
          <button className="chat-footer-form-submit" type="submit">
            <MdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

ChatApp.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
  chatMessage: PropTypes.string,
  newMessage: PropTypes.func.isRequired,
  submitMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        handle: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

ChatApp.defaultProps = {
  chatMessage: '',
};

export default ChatApp;
