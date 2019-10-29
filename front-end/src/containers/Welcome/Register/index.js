// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Register from 'src/components/Welcome/Register';

// Action Creators
import { changeValue, doSignUp } from 'src/store/reducer/user';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  handle: state.user.handle,
  email: state.user.signUpEmail,
  password: state.user.signUpPassword,
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
  signUp: () => {
    const action = doSignUp();
    dispatch(action);
  },
});

// Container
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

// == Export
export default RegisterContainer;
