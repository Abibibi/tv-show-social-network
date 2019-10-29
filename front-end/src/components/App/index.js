// == Import : npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom';

// https://reacttraining.com/react-router/web/example/animated-transitions
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// == Import : local
import './app.scss';

import Welcome from 'src/components/Welcome';
import Genres from 'src/containers/Genres';
import Footer from 'src/components/Footer';
import Friends from 'src/components/Friends';
import Profile from 'src/components/Profile';
import Home from 'src/containers/Home';
import Series from 'src/containers/Series';
import Header from 'src/components/Header';
import Serie from 'src/containers/Series/Serie';
import ChatApp from 'src/containers/ChatApp';

// Données concernant les titres des headers (provisoires)
const titles = {
  avis: 'Ne rate pas les derniers avis postés',
  genre: 'C\'est quoi ton genre ?',
  series: 'Trouve ta série',
  serie: 'Nom de la série',
  amis: 'Trouve d\'autres SerialKillers',
  profil: 'Coralie Lingoli',
};

// == Composant
const App = ({ logged }) => {
  const [headerTitle, setHeaderTitle] = useState('');
  useEffect(() => {
    // j'initialise le titre tout de suite
    const changeTitle = () => {
      // le switch permet de gérer au cas par cas un titre en fonction de window.location.pathname.
      // piste d'améliration :
      // faire une fonction getTitleByPathname, c'est fonction prendrait en paramètre d'entrée
      // le pathname et retournerai une chaine de caractère à mettre en titre
      switch (window.location.pathname) {
        case '/':
          document.title = 'Serial Killer - Accueil';
          setHeaderTitle(titles.avis);
          break;
        case '/genres':
          document.title = 'Serial Killer - Tous les genres';
          setHeaderTitle(titles.genre);
          break;
        case '/friends':
          document.title = 'Serial Killer - Amis';
          setHeaderTitle(titles.amis);
          break;
        case '/profile':
          document.title = 'Serial Killer - Mon profil';
          setHeaderTitle(titles.profil);
          break;
        case '/genres/series':
          document.title = 'Serial Killer - Séries par genre';
          setHeaderTitle(titles.series);
          break;
        case '/genres/series/serie':
          document.title = 'Serial Killer - Série';
          setHeaderTitle(titles.serie);
          break;
        default:
          document.title = '404';
          setHeaderTitle('');
      }
    };
    changeTitle();
    // le hoc a enrichi le composant
    // le hoc withRouter (voir en bas du fichier) nous met à
    // disposition des props liées à l'historique et l'url
    // on récupère ici une prop history, c'est un objet possédant une méthode listen
    // listen est un moyen d'écouter tous les changements d'url,
    // on transmet une fonction de rappel, un callback pour réagir
    // à chaque changement d'url on va changer le titre du document
  /*   history.listen(changeTitle); */
  });

  const location = useLocation();
  return (
    <div id="app">
      {logged && <Header title={headerTitle} />}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={450}
        >
          <Switch location={location}>
            {/* Affichage du composant welcome si pas connécté ou home si connécté */}
            <Route path="/" exact>
              {(!logged && <Welcome />) || (logged && <Home />)}
            </Route>
            {/* Affichage des genres au clic sur séries */}
            <Route path="/genres" exact>
              {logged && <Genres />}
            </Route>
            {/* Affichage des la page amis au clic sur amis */}
            <Route path="/friends" exact>
              {logged && <Friends />}
            </Route>
            {/* Affichage des profil au clic sur profil */}
            <Route path="/profile" exact>
              {logged && <Profile />}
            </Route>
            {/* Affichage des séries selon un genre */ }
            <Route path="/genres/:name" exact>
              {logged && <Series />}
            </Route>
            <Route path="/genres/series/:serie" exact>
              {logged && <Serie />}
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      {logged && <ChatApp />}
      {/* Affichage du footer dans tous les cas */}
      <Footer />
    </div>
  );
};

App.propTypes = {
  logged: PropTypes.bool.isRequired,
};


// == Export
export default withRouter(App);
