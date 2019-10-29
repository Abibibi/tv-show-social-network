// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Serie from 'src/components/Genres/Series/Serie';
import { getSerieDetails } from 'src/store/reducer/serie';

// Action Creators

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */

/* Je vais chercher dans le state du reducer serie puis je prends les donnés donc serie.title */
const mapStateToProps = (state) => ({
  serie: state.serie.oneSerie,
  directors: state.serie.directors.map((director) => director.name),
  actors: state.serie.actors.map((actor) => actor.name),
  genre: state.serie.genre.name,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  catchSerieDetails: () => {
    const action = getSerieDetails();
    dispatch(action);
  },
});

// Container
const SerieContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Serie);

// == Export
export default SerieContainer;
