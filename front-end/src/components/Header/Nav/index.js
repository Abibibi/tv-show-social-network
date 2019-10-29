// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaTv, FaUser, FaUsers } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

// == Import : local
import './nav.scss';

// == Composant
const Nav = ({ signOut }) => {
  const signingOut = () => {
    signOut();
  };
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-logo">
          <img className="navbar-logo-svg" alt="" />
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/genres" activeClassName="selected" className="navbar-link">
            Séries
          </NavLink>
          <NavLink to="/friends" activeClassName="selected" className="navbar-link">
            Amis
          </NavLink>
          <NavLink to="/profile" activeClassName="selected" className="navbar-link">
            Mon profil
          </NavLink>
          <input className="search__input" type="text" placeholder="Recherche une série..." />
          <NavLink onClick={signingOut} to="/" activeClassName="selected" className="navbar-logout">
            <FiLogOut />
          </NavLink>
        </div>
      </nav>
      <nav className="navbar-responsive-top">
        <NavLink to="/" className="navbar-responsive-logo">
          <img className="navbar-responsive-top-logo-svg" alt="" />
        </NavLink>
        <input className="search__input" type="text" placeholder="Recherche une série..." />
      </nav>
      <nav className="navbar-responsive-bottom">
        <NavLink to="/genres" className="navbar-responsive-link" activeClassName="selected" exact>
          <FaTv className="navbar-responsive-icon" />
        </NavLink>
        <NavLink to="/friends" activeClassName="selected" className="navbar-responsive-link" exact>
          <FaUsers className="navbar-responsive-icon" />
        </NavLink>
        <NavLink to="/profile" activeClassName="selected" className="navbar-responsive-link" exact>
          <FaUser className="navbar-responsive-icon" />
        </NavLink>
        <NavLink onClick={signingOut} to="/" activeClassName="" className="navbar-responsive-link" exact>
          <FiLogOut className="navbar-responsive-icon" />
        </NavLink>
      </nav>
    </>
  );
};

Nav.propTypes = {
  signOut: PropTypes.func.isRequired,
};

// == Export
export default Nav;
