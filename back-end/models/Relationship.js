const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');


const Relationship = db.define('relationship', {

});

// to get all info on a user followed by another user
Relationship.belongsTo(User, {
    as: 'followedUser',
    through: 'relationship',
    foreignKey: 'followedUserId'
});

// to get info on every relationship of one user 
// (relationship id, createdAt, updateAt, user id 
// and followed user id)
User.hasMany(Relationship, {
    as: 'relations',
});

module.exports = Relationship;