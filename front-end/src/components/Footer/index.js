// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './footer.scss';

// == Composant
const Footer = ({ logged }) => (
  <footer className="footer">
    <div className="footer-copyright">SerialKiller - 2020 ©</div>
    {!logged && window.location.pathname === '/'
    && <div className="footer-credits">Crédit photo : <a href="https://pixabay.com/fr/users/OmarMedinaFilms-818453/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3086305">Omar Medina Films</a> de <a href="https://pixabay.com/fr/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3086305">Pixabay</a></div>}
  </footer>
);

Footer.propTypes = {
  logged: PropTypes.bool.isRequired,
};

// == Export
export default Footer;
