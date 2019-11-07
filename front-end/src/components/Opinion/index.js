// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'src/store/selectors';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// == Import : local
import './opinion.scss';


// == Composant
const Opinion = ({
  reviews,
  reviewContentShowPage,
  showId,
  showTitle,
  changeReviewInput,
  submitReview,
}) => {
  const [text, setText] = useState('');

  const handleChangeInputArea = (event) => {
    const { id: eventTargetId, value } = event.target;
    changeReviewInput(eventTargetId, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitReview();
  };

  const visibilityButton = classNames({
    'avis-form-textareabutton-button': true,
    'avis-form-textareabutton-button-hidden': !reviewContentShowPage,
  });

  return (
    <div className="avis">
      <h2 className="avis-title">Avis</h2>
      <form onSubmit={handleSubmit} className="avis-form">
        <div className="avis-form-textareabutton">
          <textarea
            onFocus={() => setText('Tu peux poster tout ce que tu veux, du moment qu\'il ne s\'agit pas de propos discriminatoires. Le cas échéant, les commentaires seront supprimés.')}
            onBlur={() => setText('')}
            id={showId}
            onChange={handleChangeInputArea}
            className="avis-form-textareabutton-textarea"
            placeholder={`Donne ton avis sur ${showTitle}`}
            value={reviewContentShowPage}
            required
          />
          <button type="submit" aria-label="Ok" className={visibilityButton}>Poster</button>
        </div>
      </form>
      <div className="avis-warning">{text}</div>
      {/* slice().reverse() : to order both reviews from DB and from websocket by DESC */}
      {reviews.slice().reverse().map((review) => {
        const {
          id,
          content,
          createdAt,
          user: {
            handle,
          },
        } = review;
        return (
          <div key={id} className="avis-com">
            <p className="avis-com-top">
              {/* <Link to={`/profil/${slug}`}> */}
              <span className="avis-com-util">{handle}</span>
              {/* </Link> */}
              <span> a posté le </span>
              <span className="avis-com-date">{formatDate(createdAt)}</span>
            </p>
            <p className="avis-com-para">{content}</p>
          </div>
        );
      })}
    </div>
  );
};

Opinion.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      /*  id: PropTypes.number.isRequired, */
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        /* id: PropTypes.number.isRequired, */
        handle: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  reviewContentShowPage: PropTypes.string,
  changeReviewInput: PropTypes.func.isRequired,
  submitReview: PropTypes.func.isRequired,
  showId: PropTypes.number.isRequired,
  showTitle: PropTypes.string.isRequired,
};

Opinion.defaultProps = {
  reviewContentShowPage: '',
};

// == Export
export default Opinion;
