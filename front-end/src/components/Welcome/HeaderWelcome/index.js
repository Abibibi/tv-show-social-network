// == Import : npm
import React from 'react';
import logo from 'src/styles/assets/images/serialkiller-logo.png';
import welcomePicture from 'src/styles/assets/images/welcome-picture.jpg';

// == Import : local
import './header.scss';

// == Composant
const HeaderWelcome = () => (
  <div className="headerwelcome">
    <div className="headerwelcome-logo">
      <img className="headerwelcome-logo-img" src={logo} alt="Logo Serial Killer" />
    </div>
    <div className="headerwelcome-bottom">
      <div className="headerwelcome-bottom-picture">
        <img className="headerwelcome-bottom-picture-img" src={welcomePicture} alt="Une femme et un homme bouche bée face à un ordinateur portable" />
      </div>
      <div className="headerwelcome-bottom-text">
        <div className="headerwelcome-bottom-text-desc">
          <h1 className="headerwelcome-bottom-text-desc-title">Deviens un SerialKiller</h1>
          <p className="headerwelcome-bottom-text-desc-content">Rejoins la communauté réservée aux dévoreurs de séries</p>
        </div>
        <div className="headerwelcome-bottom-text-link">
          <a className="headerwelcome-bottom-text-link-button hvr-sweep-to-left" href="#register">Entre dans le game</a>
        </div>
      </div>
    </div>
  </div>
);

// == Export
export default HeaderWelcome;
