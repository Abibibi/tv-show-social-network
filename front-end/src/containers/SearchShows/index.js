// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import SearchShows from 'src/components/SearchShows';

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
  seriesFiltered: state.search.allShowsFiltered,
  searchWordByHandle: state.search.searchSeriesInput,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */

// Container
const SearchShowsContainer = connect(
  mapStateToProps,
)(SearchShows);

// == Export
export default SearchShowsContainer;
