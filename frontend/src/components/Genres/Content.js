// == Import : npm
import React from 'react';

// == Import : local
import './genres.scss';

// == Composant
const Content = () => (
  <div className="genres">
    <a className="genres-genre" href="#"><img className="genres-genre-image" src="https://images.pexels.com/photos/16484/ginger-squirrel-16484.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />Genre</a>
    <a className="genres-genre" href="#">Genre</a>
    <a className="genres-genre" href="#">Genre</a>
    <a className="genres-genre" href="#">Genre</a>
    <a className="genres-genre" href="#">Genre</a>
  </div>
);

// == Export
export default Content;
