const Sequelize = require('sequelize');
const db = require('../config/database');
const Show = require('./Show');
const Director = require('./Director');


const ShowDirectors = db.define('shows_have_directors', {

})

// Many-to-Many relationship between Show and Director
Show.belongsToMany(Director, {
    through: ShowDirectors,
    foreignKey: 'shows_id'
});


// Many-to-Many relationship between Director and Show
Director.belongsToMany(Show, {
    through: ShowDirectors,
    foreignKey: 'directors_id'
});

module.exports = ShowDirectors;