// == Import : npm
import React from 'react';
// import du composant qui gére un carousel
import AwesomeSlider from 'react-awesome-slider';
// import optionnel pour apporter un style au carousel
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation/cube-animation.scss';

import avisSeries from 'src/styles/assets/images/avis-series.gif';
import bibliothequeSeries from 'src/styles/assets/images/bibliotheque-series.gif';
import reactionMoment from 'src/styles/assets/images/partage-reaction-moment.gif';
import reseauAbonnements from 'src/styles/assets/images/reseau-abonnements.gif';

// == Import : local
import './content.scss';

// == Composant
const Content = () => (
  <AwesomeSlider className="slider" cssModule={AwesomeSliderStyles}>
    <div className="slider-text" data-src={avisSeries}>Donne ton avis sur les séries que tu suis</div>
    <div className="slider-text" data-src={reactionMoment}>Partage ta réaction du moment avec les autres SerialKillers</div>
    <div className="slider-text" data-src={bibliothequeSeries}>Accède à une grande bibliothèque d'infos séries</div>
    <div className="slider-text" data-src={reseauAbonnements}>Fais-toi un réseau grâce aux abonnements</div>
  </AwesomeSlider>
);

// == Export
export default Content;
