// == Import : npm
import React from 'react';

// == Import : local
import './header.scss';

// == Composant
const Header = () => (
  <div className="header">
    <h1 className="header-logo"><span className="header-logo--letter">S</span>erial <span className="header-logo--letter">K</span>iller</h1>
    <div className="header-bottom">
      <h2 className="header-bottom-title">Deviens un SerialKiller</h2>
      <p className="header-bottom-content">Rejoins la communauté réservée au dévoreurs de séries</p>
      <a className="header-bottom-link hvr-sweep-to-left" href="#register">Entre dans le game</a>
    </div>
  </div>
);

// == Export
export default Header;
