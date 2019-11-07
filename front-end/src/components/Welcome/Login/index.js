// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './login.scss';

// == Composant
const Login = ({
  email,
  password,
  modifyValue,
  logIn,
  signedIn,
  signInFail,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    modifyValue(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
  };

  return (
    <>
      <h3 id="login" className="title">Connecte-toi</h3>
      <form onSubmit={handleSubmit} className="form-login">
        <label className="form-label" htmlFor="login-email">
            E-mail
          <input
            className="form-label-input"
            id="login-email"
            name="signInEmail"
            type="email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="form-label" htmlFor="login-password">
            Mot de passe
          <input
            className="form-label-input"
            id="login-password"
            name="signInPassword"
            type="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        {console.log(signInFail)}
        {(signInFail && !signedIn && <div className="form-signin-fail">Identifiants invalides</div>)
        || (signedIn && !signInFail && <div className="form-signin-success">Connexion réussie</div>)}
        <button className="form-button hvr-sweep-to-left-register-login" type="submit">
          Je me connecte
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  modifyValue: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  signInFail: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  email: '',
  password: '',
};

// == Export
export default Login;
