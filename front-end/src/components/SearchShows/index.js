// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import 'src/components/Genres/Series/series.scss';
import './searchshows.scss';

// == Composant
const Series = ({ seriesFiltered }) => {
  const resultsNumber = seriesFiltered.length;

  const pluralResults = resultsNumber > 1 ? 'résultats' : 'résultat';

  return (
    <>
      <p className="searchPage-title"><span>{resultsNumber}</span> {pluralResults}</p>
      <div className="series-search">
        {seriesFiltered.map((serie) => {
          const {
            title,
            picture,
            id,
            slug: serieSlug,
            genre: {
              slug: genreSlug,
            },
          } = serie;
          return (    
            <Link to={`/${genreSlug}/${serieSlug}`} className="series-search-card" key={id}>
              <img className="series-search-card-image" src={picture} alt={title} />
              <span className="series-search-card-title">{title}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

Series.propTypes = {
  seriesFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};


// == Export
export default Series;
