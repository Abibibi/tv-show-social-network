// mon ORM pour gérer ma BDD
const Sequelize = require('sequelize');

// pour l'instant, je me connecte sur ma BDD en local
// const sequelize =  new Sequelize('serialkiller', 'serialkiller', 'serialkiller', {
//   host: 'localhost',
//   dialect: 'postgres',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });

// quand je me connecterai à ma BDD en ligne, sur ElephantSQL :
const sequelize = new Sequelize('postgres://ezeaoxfx:au9utTB8vKr8aiiXhqnKVvyy9M-4oSAK@salt.db.elephantsql.com:5432/ezeaoxfx', {
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = sequelize;
