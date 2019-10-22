// == Import : npm
import React from 'react';
// import du composant qui gére un carousel
import AwesomeSlider from 'react-awesome-slider';
// import optionnel pour apporter un style au carousel
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation/cube-animation.scss';

// == Import : local
import './content.scss';

// == Composant
const Content = () => (
  <AwesomeSlider className="slider" cssModule={AwesomeSliderStyles}>
    <div className="slider-text" data-src="https://images.pexels.com/photos/16484/ginger-squirrel-16484.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">Donne ton avis et participe à des débats</div>
    <div className="slider-text" data-src="https://images.pexels.com/photos/16484/ginger-squirrel-16484.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">Chatte avec les autres SerialKillers</div>
    <div className="slider-text" data-src="https://images.pexels.com/photos/16484/ginger-squirrel-16484.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">Accède à une grande bibliothèque d'informations</div>
    <div className="slider-text" data-src="https://images.pexels.com/photos/16484/ginger-squirrel-16484.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">Fais-toi un réseau d'amis et partage ta réaction du moment</div>
  </AwesomeSlider>
);

// == Export
export default Content;
