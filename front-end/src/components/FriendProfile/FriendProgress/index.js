import React, { useState } from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar } from 'react-step-progress-bar';
import PropTypes from 'prop-types';

// == Import : local
import './friendprogress.scss';


// == Composant
const FriendProgress = ({ addiction }) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <ProgressBar
        percent={count}
        filledBackground="linear-gradient(to right, #393e46, #f96d00)"
        hasStepZero
      />
      <button type="button" className="button" onClick={() => setCount(addiction)}>
        Clique !
      </button>
    </>
  );
};

FriendProgress.propTypes = {
  addiction: PropTypes.number.isRequired,
};

// == Export
export default FriendProgress;
