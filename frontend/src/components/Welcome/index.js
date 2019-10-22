// == Import : npm
import React from 'react';

// == Import : local
import Header from 'src/components/Welcome/Header';
import Content from 'src/components/Welcome/Content';
import Login from 'src/containers/Welcome/Login';
import Register from 'src/containers/Welcome/Register';

// == Composant
const Welcome = () => (
  <div id="welcome">
    <Header />
    <Content />
    <Register />
    <Login />
  </div>
);

// == Export
export default Welcome;
