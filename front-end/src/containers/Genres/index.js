// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Genres from 'src/components/Genres';

// Action Creators
import { fetchGenre } from 'src/store/reducer/genre';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  genres: state.genre.genres,
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

});

// Container
const GenresContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Genres);

// == Export
export default GenresContainer;
