const Sequelize = require('sequelize');
const db = require('../config/database');


const Actor = db.define('actor', {
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Actor;