const Sequelize = require('sequelize');
const db = require('../config/database');


const Director = db.define('director', {
    name: {
        type: Sequelize.STRING
    }
})


module.exports = Director;