// == Import : npm
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import PropTypes from 'prop-types';

// == Import : local
import './opinion.scss';


// == Composant
const Opinion = ({ handle = 'Pseudo', date = 'Date', opinion = 'Un avis' }) => (
  <div className="avis">
    <h2 className="avis-title">Avis</h2>
    <form className="avis-form">
      <textarea
        className="avis-form-textarea"
        placeholder="Toi aussi, donne ton avis !"
        required
      />
      <button type="submit" aria-label="Ok" className="avis-form-button"><FaPaperPlane /></button>
    </form>
    <div className="avis-com">
      <p className="avis-com-top">
        <span className="avis-com-util">{handle} </span>
        a posté le
        <span className="avis-com-date"> {date}</span>
      </p>
      <p className="avis-com-para">{opinion}</p>
    </div>
  </div>
);

Opinion.propTypes = {
  handle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  opinion: PropTypes.string.isRequired,
};

// == Export
export default Opinion;
