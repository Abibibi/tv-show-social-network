// == Import : npm
import React from 'react';
import logo from 'src/styles/assets/images/logo.png';

// == Import : local
import './header.scss';

// == Composant
const HeaderWelcome = () => (
  <div className="headerwelcome">
    <div className="headerwelcome-logo">
      <img className="headerwelcome-logo-img" src={logo} alt="logo" />
    </div>
    <div className="headerwelcome-bottom">
      <h1 className="headerwelcome-bottom-title">Deviens un SerialKiller</h1>
      <p className="headerwelcome-bottom-content">Rejoins la communauté réservée aux dévoreurs de séries</p>
      <a className="headerwelcome-bottom-link hvr-sweep-to-left" href="#register">Entre dans le game</a>
    </div>
  </div>
);

// == Export
export default HeaderWelcome;
