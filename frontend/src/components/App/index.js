// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// == Import : local
import './app.scss';

import Welcome from 'src/components/Welcome';
import Nav from 'src/components/Nav';
import Genres from 'src/components/Genres';
import Footer from 'src/components/Footer';
import Friends from 'src/components/Friends';
import Profile from 'src/components/Profile';
import Home from 'src/containers/Home';

// == Composant
const App = ({ logged }) => (
  <div id="app">
    {/* Affichage de la navbar si connecté */}
    {logged && <Nav />}
    <Switch>
      {/* Affichage du composant welcome si pas connécté */}
      <Route path="/" exact>
        {!logged && <Welcome />}
        {/* Affichage de la home après connexion */}
        {logged && <Home />}
      </Route>
      {/* Affichage des genres au clic sur séries */}
      <Route path="/genres" exact>
        <Genres />
      </Route>
      {/* Affichage des la page amis au clic sur amis */}
      <Route path="/friends" exact>
        <Friends />
      </Route>
      {/* Affichage des profil au clic sur profil */}
      <Route path="/profile" exact>
        <Profile />
      </Route>
    </Switch>
    {/* Affichage du footer dans tous les cas */}
    <Footer />
  </div>
);

App.propTypes = {
  logged: PropTypes.bool.isRequired,
};


// == Export
export default App;
