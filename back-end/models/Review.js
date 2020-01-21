const Sequelize = require('sequelize');
const db = require('../config/database');


const Review = db.define('review', {
    content: {
        type: Sequelize.STRING
    },
    users_id: {
        type: Sequelize.NUMBER
    },
    shows_id: {
        type: Sequelize.NUMBER
    }
})



module.exports = Review;