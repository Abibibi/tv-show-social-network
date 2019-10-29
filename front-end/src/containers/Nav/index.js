// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Nav from 'src/components/Header/Nav';

// Action Creators
import { doSignOut } from 'src/store/reducer/user';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    const action = doSignOut();
    dispatch(action);
  },
});

// Container
const NavContainer = connect(
  null,
  mapDispatchToProps,
)(Nav);

// == Export
export default NavContainer;
