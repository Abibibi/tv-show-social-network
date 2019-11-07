// == Import : npm
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';



// == Import : local
import './home.scss';
import { formatDate } from 'src/store/selectors';

// == Composant
const Home = ({
  getReviews,
  allReviews,
  getShows,
  allShows,
  reviewShow,
  changeShowInput,
  changeReviewInput,
  reviewContent,
  submitReview,
}) => {
  useEffect(() => {
    getReviews();
    getShows();
  }, []);

  const handleChangeInputSearch = (event) => {
    const { value } = event.target;
    changeShowInput(value);
  };

  const [text, setText] = useState('');

  const handleChangeInputArea = (event) => {
    const { value } = event.target;
    changeReviewInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitReview();
  };

  const visibilityButton = classNames({
    'home-form-textareabutton-button': true,
    'home-form-textareabutton-button-hidden': !reviewContent,
  });

  return (
    <div className="home">
      <h1 className="home-title">Toi aussi donne ton avis</h1>
      <form onSubmit={handleSubmit} className="home-form">
        <select className="home-form-choice" value={reviewShow} onChange={handleChangeInputSearch}>
          <option value="Sélectionne ta série">Sélectionne ta série</option>
          {allShows.map((show) => {
            const { id, title } = show;
            return (
              <option key={id} value={title}>{title}</option>
            );
          })}
        </select>
        <div className="home-form-textareabutton">
          <textarea
            onFocus={() => setText('Tu peux poster tout ce que tu veux, du moment qu\'il ne s\'agit pas de propos discriminatoires. Le cas échéant, les commentaires seront supprimés.')}
            onBlur={() => setText('')}
            onChange={handleChangeInputArea}
            className="home-form-textareabutton-textarea"
            placeholder="Donne ton avis sur la série que tu as choisie !"
            value={reviewContent}
            required
          />
          <button type="submit" aria-label="Ok" className={visibilityButton}>Poster</button>
        </div>
      </form>
      <div className="home-warning">{text}</div>
      <h2 className="home-subtitle">Les derniers avis postés</h2>
      {/* slice().reverse() : to order both reviews from DB and from websocket by DESC */}
      {allReviews.slice().reverse().map((review) => {
        const {
          id,
          content,
          createdAt,
          user: {
            handle,
          },
          show: {
            title,
          },
        } = review;
        return (
          <div key={id} className="home-com">
            <p className="home-com-top">
              {/* <Link to={`/profil/${userSlug}`}> */}
              <span className="home-com-util">{handle}</span>
              {/* </Link> */}
              <span> a posté dans </span>
              {/* <Link to={`/${genreSlug}/${showSlug}`}> */}
              <span className="home-com-serietitle">{title}</span>
              {/* </Link> */}
              <span> le </span>
              <span className="home-com-date">{formatDate(createdAt)}</span>
            </p>
            <p className="home-com-para">{content}</p>
          </div>
        );
      })}
    </div>
  );
};

Home.propTypes = {
  changeReviewInput: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  getShows: PropTypes.func.isRequired,
  changeShowInput: PropTypes.func.isRequired,
  allReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      /* stars: PropTypes.number.isRequired, */
      user: PropTypes.shape({
        handle: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }).isRequired,
      show: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        genre: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  ).isRequired,
  reviewShow: PropTypes.string,
  reviewContent: PropTypes.string,
  allShows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  submitReview: PropTypes.func.isRequired,
};

Home.defaultProps = {
  reviewShow: '',
  reviewContent: '',
};

// == Export
export default Home;
