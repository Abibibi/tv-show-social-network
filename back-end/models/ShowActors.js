const Sequelize = require('sequelize');
const db = require('../config/database');
const Show = require('./Show');
const Actor = require('./Actor');


const ShowActors = db.define('shows_have_actors', {

})

// Many-to-Many relationship between Show and Actor
Show.belongsToMany(Actor, {
    through: ShowActors,
    foreignKey: 'shows_id'
});

// Many-to-Many relationship between Actor and Show
Actor.belongsToMany(Show, {
    through: ShowActors,
    foreignKey: 'actors_id'
});

module.exports = ShowActors;