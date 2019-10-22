// == Import : npm
import React from 'react';

// == Import : local
import './home.scss';
import Header from 'src/components/Home/Header';


// == Composant
const Home = ({ signOut }) => {
  const signingOut = () => {
    signOut();
  };

  return (
    <>
      <Header />
      <button onClick={signingOut}>Déconnecte-toi</button>
    </>
  );
};

// == Export
export default Home;
