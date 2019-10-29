const Sequelize = require('sequelize');
const db = require('../config/database');
const Review = require('./Review');
const Director = require('./Director');
const Actor = require('./Actor');


const Show = db.define('show', {
    title: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.NUMBER
    },
    summary: {
        type: Sequelize.STRING
    },
    trailer: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    },
    
});


Show.hasMany(Review, {
    foreignKey: 'shows_id',
    // to target foreign key in source Model,
    // which is Show id
    sourceKey: 'id'
});

Review.belongsTo(Show, {
    foreignKey: 'shows_id',
    // to target foreign key in target Model,
    // which is Show id
    targetKey: 'id'
});


module.exports = Show;