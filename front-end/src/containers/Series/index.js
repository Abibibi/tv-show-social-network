// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Series from 'src/components/Genres/Series';
import { getSeriesByGenre } from 'src/store/reducer/serie';

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
  series: state.serie.seriesByGenre,
  genreSlug: state.serie.seriesOneGenre.slug,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  catchSeriesByGenre: () => {
    const action = getSeriesByGenre();
    dispatch(action);
  },

});

// Container
const SeriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Series);

// == Export
export default SeriesContainer;
