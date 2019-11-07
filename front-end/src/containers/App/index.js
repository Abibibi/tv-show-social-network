// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import App from 'src/components/App';

import { fetchGenre } from 'src/store/reducer/genre';

import { fetchSeriesAndRelatedGenres } from 'src/store/reducer/serie';

import { getFriendSlugs } from 'src/store/reducer/friend';

// Action Creators

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  logged: state.user.logged,
  searchDone: state.search.searchDone,
  genres: state.genre.genres,
  seriesAndRelatedGenres: state.serie.seriesAndRelatedGenres,
  friendSlugs: state.friend.friendSlugs.filter((friendSlug) => friendSlug.slug !== state.user.sessionUserSlug),
  ownUserSlug: state.user.sessionUserSlug,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  catchGenres: () => {
    const action = fetchGenre();
    dispatch(action);
  },

  catchSeriesAndRelatedGenres: () => {
    const action = fetchSeriesAndRelatedGenres();
    dispatch(action);
  },

  catchFriendSlugs: () => {
    const action = getFriendSlugs();
    dispatch(action);
  },
});

// Container
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

// == Export
export default AppContainer;
