// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './header.scss';
import Nav from 'src/containers/Nav';

// == Composant
const Header = ({ title }) => (
  <>
    <Nav />
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  </>
);


Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// == Export
export default Header;
