// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Profile from 'src/components/Profile';

// Action Creators
import { getOwnProfile } from 'src/store/reducer/user';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */

/* Je vais chercher dans le state du reducer serie puis je prends les donnés donc serie.title */
const mapStateToProps = (state) => ({
  ownProfile: state.user.ownProfile,
  reviews: state.user.reviews,
  relationships: state.user.relationships,
  totalSeries: state.serie.seriesAndRelatedGenres.length,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  getMyProfile: () => {
    const action = getOwnProfile();
    dispatch(action);
  },

});

// Container
const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

// == Export
export default ProfileContainer;
