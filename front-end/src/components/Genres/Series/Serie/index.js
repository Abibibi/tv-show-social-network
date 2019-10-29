// == Import : npm
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

// == Import : local
import './serie.scss';
import Opinion from 'src/components/Opinion';


// == Composant
const Serie = ({
  serie: {
    title,
    trailer,
    year,
    summary,
    picture,
  },
  directors,
  actors,
  genre,
  catchSerieDetails,
}) => {
  useEffect(() => {
    catchSerieDetails();
  }, []);

  return (
    <>
      <div className="serie">
        <div className="serie-top">
          <ReactPlayer className="serie-top-trailer" url={trailer} playing={false} controls width="100%" />
          <div className="serie-top-infos">
            <p className="serie-top-infos-titre">{title}</p>
            <p className="serie-top-infos-genre">{genre}</p>
            <p className="serie-top-infos-sortie">{year}</p>
            <p className="serie-top-infos-realise">Réalisé par {directors.join(', ')}</p>
            <p className="serie-top-infos-acteurs">Acteurs : {actors.join(', ')}</p>
          </div>
        </div>
        <div className="serie-resume">
          <h2 className="serie-resume-title">Résumé</h2>
          <p className="serie-resume-para">{summary}</p>
        </div>
      </div>
      <Opinion />
    </>
  );
};

Serie.propTypes = {
  serie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    
    // actors: PropTypes.array.isRequired,
    // genre: PropTypes.shape({
    //   name: PropTypes.string.isRequired,
    // }).isRequired,
  }).isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  catchSerieDetails: PropTypes.func.isRequired,
};

// == Export
export default Serie;
