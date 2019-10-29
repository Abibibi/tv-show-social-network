// == Import : npm
import React from 'react';

// == Import : local
import './profile.scss';

// == Composant
const Profile = () => (
  <div className="profil">
    <div className="profil-infos">
      <h1 className="profil-infos-title">Infos</h1>
      <p className="profil-infos-prenom">Prénom</p>
      <p className="profil-infos-nom">Nom</p>
      <p className="profil-infos-age">âge</p>
      <p className="profil-infos-mail">E-mail</p>
    </div>
    <div className="profil-skills">
      <p className="profil-skills-addict">Addiction aux séries</p>
      <p className="profil-skills-avis">Nombres d'avis postés</p>
    </div>
    <div className="profil-friends">
      <h1 className="profil-friends-title">Amis</h1>
      <div className="profil-friends-friend">
        <h2 className="profil-friends-friend-name">Claude</h2>
      </div>
    </div>
  </div>
);

// == Export
export default Profile;
