// == Import : npm
import React from 'react';
import PageProgress from 'react-page-progress';

// == Import : local
import HeaderWelcome from 'src/components/Welcome/HeaderWelcome';
import Content from 'src/components/Welcome/Content';
import Login from 'src/containers/Welcome/Login';
import Register from 'src/containers/Welcome/Register';

// == Composant
const Welcome = () => (
  <div id="welcome">
    <PageProgress color="#f96d00" />
    <HeaderWelcome />
    <Content />
    <Register />
    <Login />
  </div>
);

// == Export
export default Welcome;
