// == Import : npm
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './genres.scss';

// == Composant
const Genres = ({ genres, catchGenres }) => {
  useEffect(() => {
    catchGenres();
  }, []);

  return (
    <div className="genres">
      {genres.map((genre) => {
        const {
          name,
          image,
          id,
          slug,
        } = genre;
        return (
          <Link to={`/genres/${slug}`} className="genres-card" key={id}>
            <img className="genres-card-image" src={image} alt={name} />
            <span className="genres-card-title">{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
  catchGenres: PropTypes.func.isRequired,
};

// == Export
export default Genres;
