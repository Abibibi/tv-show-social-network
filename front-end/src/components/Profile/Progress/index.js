import React, { useState } from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar } from 'react-step-progress-bar';
import PropTypes from 'prop-types';

// == Import : local
import './progress.scss';


// == Composant
const Progress = ({ addiction }) => {
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

Progress.propTypes = {
  addiction: PropTypes.number.isRequired,
};

// == Export
export default Progress;
