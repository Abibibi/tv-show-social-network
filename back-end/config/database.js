// mon ORM pour gérer ma BDD
const Sequelize = require('sequelize');

// pour l'instant, je me connecte sur ma BDD en local
const sequelize =  new Sequelize(process.env.LOCAL_DATABASE, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PASSWORD, {
  host: process.env.LOCAL_DB_HOST,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// quand je me connecterai à ma BDD en ligne, sur ElephantSQL :
/* const sequelize = new Sequelize(`postgres://${process.env.REMOTE_DB_USERNAME}:${process.env.REMOTE_DB_PASSWORD}@${process.env.REMOTE_DB_HOST}/${process.env.REMOTE_DATABASE}`, {
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}); */

module.exports = sequelize;
