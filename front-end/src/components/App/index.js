// == Import : npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  useLocation,
  withRouter,
  Redirect,
} from 'react-router-dom';

// https://reacttraining.com/react-router/web/example/animated-transitions
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// == Import : local
import './app.scss';

import Welcome from 'src/components/Welcome';
import Genres from 'src/containers/Genres';
import Footer from 'src/containers/Footer';
import Friends from 'src/containers/Friends';
import Profile from 'src/containers/Profile';
import FriendProfile from 'src/containers/FriendProfile';
import Home from 'src/containers/Home';
import Series from 'src/containers/Series';
import Header from 'src/components/Header';
import Serie from 'src/containers/Series/Serie';
import ChatApp from 'src/containers/ChatApp';
import SearchShows from 'src/containers/SearchShows';


// == Composant
const App = ({
  logged,
  searchDone,
  catchGenres,
  genres,
  catchSeriesAndRelatedGenres,
  seriesAndRelatedGenres,
  catchFriendSlugs,
  friendSlugs,
  ownUserSlug,
}) => {
  const changeTitle = () => {
    // le switch permet de gérer au cas par cas un titre en fonction de window.location.pathname.
    // piste d'améliration :
    // faire une fonction getTitleByPathname, c'est fonction prendrait en paramètre d'entrée
    // le pathname et retournerai une chaine de caractère à mettre en titre

    genres.map(({ slug, name }) => {
      if (window.location.pathname === `/${slug}`) {
        document.title = `Serial Killer - Séries ${name}`;
      }
    });
        
    seriesAndRelatedGenres.map(({
      slug: serieSlug,
      title: serieTitle,
      genre: {
        slug: genreSlug,
      },
    }) => {
      if (window.location.pathname === `/${genreSlug}/${serieSlug}`) {
        document.title = `Serial Killer - ${serieTitle}`;
      }
    });
    
    friendSlugs.map(({ slug, handle }) => {
      if (window.location.pathname === `/profil/${slug}`) {
        document.title = `Serial Killer - Profil de ${handle}`;
      }
    });

    if (window.location.pathname === '/') {
      document.title = 'Serial Killer - Bienvenue';
    }
    else if (window.location.pathname === '/home') {
      document.title = 'Serial Killer - Accueil';
    }
    else if (window.location.pathname === '/genres') {
      document.title = 'Serial Killer - Tous les genres';
    }
    else if (window.location.pathname === '/communaute') {
      document.title = 'Serial Killer - Communauté';
    }
    else if (window.location.pathname === `/profil/${ownUserSlug}`) {
      document.title = 'Serial Killer - Mon profil';
    }
    else if (window.location.pathname === '/recherche-series') {
      document.title = 'Serial Killer - Recherche d\'une série';
    }
  };

  useEffect(() => {
    // j'initialise le titre tout de suite
    changeTitle();
  });

  useEffect(() => {
    catchGenres();
    catchSeriesAndRelatedGenres();
    catchFriendSlugs();
  }, []);

  const location = useLocation();
  return (
    <div id="app">
      {logged && <Header />}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={450}
        >
          <Switch location={location}>
            {logged && <Redirect exact from="/" to="/home" />}
            {location.pathname !== '/search' && searchDone && <Redirect to="/search" />}
            {/* Affichage du composant welcome si pas connécté ou home si connecté */}
            <Route path="/" exact>
              {!logged && <Welcome />}
            </Route>
            <Route path="/home" exact>
              {logged && <Home />}
            </Route>
            {/* Affichage des genres au clic sur séries */}
            <Route path="/genres" exact>
              {logged && <Genres />}
            </Route>
            {/* Affichage des la page communauté au clic sur communauté */}
            <Route path="/communaute" exact>
              {logged && <Friends />}
            </Route>
            {friendSlugs.map(({ id, slug }) => (
              <Route key={id} path={`/profil/${slug}`} exact>
                {logged && <FriendProfile />}
              </Route>
            ))}
            {/* Affichage du profil utilisateur connecté en session au clic sur profil */}
            <Route path={`/profil/${ownUserSlug}`} exact>
              {logged && <Profile />}
            </Route>
            {/* Affichage des autres profils utilisateur au clic sur profil */}
            {/* Affichage des séries selon un genre */ }
            {genres.map(({ id, slug }) => (
              <Route key={id} path={`/${slug}`} exact>
                {logged && <Series />}
              </Route>
            ))}
            {seriesAndRelatedGenres.map(({
              id,
              slug: serieSlug,
              genre: {
                slug: genreSlug,
              },
            }) => (
              <Route key={id} path={`/${genreSlug}/${serieSlug}`} exact>
                {logged && <Serie />}
              </Route>
            ))}
            <Route path="/search" exact>
              {logged && <SearchShows />}
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
  searchDone: PropTypes.bool.isRequired,
  catchGenres: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  catchSeriesAndRelatedGenres: PropTypes.func.isRequired,
  seriesAndRelatedGenres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  catchFriendSlugs: PropTypes.func.isRequired,
  friendSlugs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  ownUserSlug: PropTypes.string.isRequired,
};


// == Export
export default withRouter(App);
