// == Import : npm
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './series.scss';

// == Composant
const Series = ({ series, catchSeriesByGenre }) => {
  useEffect(() => {
    catchSeriesByGenre();
  }, []);


  return (
    <div className="series">
      {series.map((serie) => {
        const {
          title,
          picture,
          id,
          slug,
        } = serie;
        return (
          <Link to={`/genres/series/${slug}`} className="series-card" key={id}>
            <img className="series-card-image" src={picture} alt={title} />
            <span className="series-card-title">{title}</span>
          </Link>
        );
      })}
    </div>
  );
};

Series.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
  catchSeriesByGenre: PropTypes.func.isRequired,
};


// == Export
export default Series;
