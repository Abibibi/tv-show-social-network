// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { FaPaperPlane } from 'react-icons/fa';

// == Import : local
import './home.scss';

// == Composant
const Home = ({ handle = 'Pseudo', title = 'Titre de la série', opinion = 'Avis' }) => (
  <div className="home">
    <form className="home-form">
      <input className="home-form-choice" placeholder="Choisis une série" />
      <div className="home-form-textareabutton">
        <textarea
          className="home-form-textareabutton-textarea"
          placeholder="Donne ton avis sur la série que tu as choisis!"
          required
        />
        <button type="submit" aria-label="Ok" className="home-form-textareabutton-button"><FaPaperPlane /></button>
      </div>
    </form>
    <div className="home-com">
      <p className="home-com-top">
        <span className="home-com-util">{handle} </span>
        a posté dans
        <span className="home-com-serietitle"> {title}</span>
      </p>
      <p className="home-com-para">{opinion}</p>
    </div>
  </div>
);

Home.propTypes = {
  handle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  opinion: PropTypes.string.isRequired,
};

// == Export
export default Home;
