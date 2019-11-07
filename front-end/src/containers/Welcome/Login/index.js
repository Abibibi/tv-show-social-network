// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Login from 'src/components/Welcome/Login';

// Action Creators
import { changeValue, doSignIn } from 'src/store/reducer/user';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  email: state.user.signInEmail,
  password: state.user.signInPassword,
  signedIn: state.user.signedIn,
  signInFail: state.user.signInFail,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  modifyValue: (newName, newValue) => {
    const action = changeValue(newName, newValue);
    dispatch(action);
  },
  logIn: () => {
    const action = doSignIn();
    dispatch(action);
  },
});

// Container
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

// == Export
export default LoginContainer;
