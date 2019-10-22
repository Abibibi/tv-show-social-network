// == Import : npm
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faUser, faUsers, faSearch, faCommentAlt } from '@fortawesome/free-solid-svg-icons'

// == Import : local
import './nav.scss';

// == Composant
const Nav = () => (
  <>
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <span className="navbar-logo--letter">S</span>erial <span className="navbar-logo--letter">K</span>iller
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
        <input className="search__input" type="text" placeholder="Recherche une série..."></input>
      </div>
    </nav>
    <nav className="navbar-responsive-top">
      <NavLink to="/" className="navbar-responsive-logo">
        SK
      </NavLink>
      <input className="search__input" type="text" placeholder="Recherche une série..."></input>
    </nav>
    <nav className="navbar-responsive-bottom">
      <NavLink to="/genres" className="navbar-responsive-link" activeClassName="selected">
        <FontAwesomeIcon className="navbar-responsive-icon" icon={faTv} />
      </NavLink>
      <NavLink to="/friends" activeClassName="selected" className="navbar-responsive-link">
        <FontAwesomeIcon className="navbar-responsive-icon" icon={faUsers} />
      </NavLink>
      <NavLink to="/profile" activeClassName="selected" className="navbar-responsive-link">
        <FontAwesomeIcon className="navbar-responsive-icon" icon={faUser} />
      </NavLink>
      <NavLink to="/message" activeClassName="selected" className="navbar-responsive-link">
        <FontAwesomeIcon className="navbar-responsive-icon" icon={faCommentAlt} />
      </NavLink>
    </nav>
  </>
);

// == Export
export default Nav;
