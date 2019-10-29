// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './register.scss';

// == Composant
const Register = ({
  firstname,
  lastname,
  handle,
  email,
  password,
  modifyValue,
  signUp,
}) => {
  const handleChange = (event) => {
    // name représente la propriété name de chaque input
    const { name, value } = event.target;
    console.log([name, value]);
    modifyValue(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <>
      <h3 id="register" className="title">Inscris-toi</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="firstname">
        Prénom
          <input
            className="form-label-input"
            id="firstname"
            name="firstname"
            type="text"
            value={firstname}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label" htmlFor="lastname">
        Nom
          <input
            className="form-label-input"
            id="lastname"
            name="lastname"
            type="text"
            value={lastname}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label" htmlFor="handle">
        Pseudo
          <input
            className="form-label-input"
            id="handle"
            name="handle"
            type="text"
            value={handle}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label" htmlFor="signup-email">
        E-mail
          <input
            className="form-label-input"
            id="signup-email"
            name="signUpEmail"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label" htmlFor="signup-password">
        Mot de passe
          <input
            className="form-label-input"
            id="signup-password"
            name="signUpPassword"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="form-button hvr-sweep-to-left-register-login" type="submit">Je m'inscris</button>
      </form>
      <a href="#login" className="toconnect">Déjà inscrit(e) ? Connecte-toi</a>
    </>
  );
};

Register.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  handle: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  modifyValue: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

Register.defaultProps = {
  firstname: '',
  lastname: '',
  handle: '',
  email: '',
  password: '',
};

// Commentaire
// == Export
export default Register;
