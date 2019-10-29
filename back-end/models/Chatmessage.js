const Sequelize = require('sequelize');
const db = require('../config/database');


const Chatmessage = db.define('chatmessage', {
    content: {
        type: Sequelize.STRING
    },
    users_id: {
        type: Sequelize.NUMBER
    }
})

module.exports = Chatmessage;