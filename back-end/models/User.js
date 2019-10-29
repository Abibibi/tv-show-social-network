const Sequelize = require('sequelize');
const db = require('../config/database');
const Review = require('./Review');
const Chatmessage = require('./Chatmessage');

const User = db.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    handle: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

User.hasMany(Review, {
    foreignKey: 'users_id',
   // to target foreign key in source Model,
    // which is User id
    sourceKey: 'id'
});

Review.belongsTo(User, {
    foreignKey: 'users_id',
    // to target foreign key in target Model,
    // which is User id
    targetKey: 'id'
});

User.hasMany(Chatmessage, {
    foreignKey: 'users_id',
   // to target foreign key in source Model,
    // which is User id
    sourceKey: 'id'
});

Chatmessage.belongsTo(User, {
    foreignKey: 'users_id',
    // to target foreign key in target Model,
    // which is User id
    targetKey: 'id'
});

module.exports = User;