const Sequelize = require('sequelize');
const db = require('../config/database');
const Show = require('./Show');


const Genre = db.define('genre', {
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    slug : {
        type: Sequelize.STRING
    }
});

Genre.hasMany(Show, {
    foreignKey: 'genres_id'
});

Show.belongsTo(Genre, {
    foreignKey: 'genres_id'
})


module.exports = Genre;