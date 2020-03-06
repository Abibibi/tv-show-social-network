// mon ORM pour gérer ma BDD
const Sequelize = require('sequelize');

// pour l'instant, je me connecte sur ma BDD en local
/* const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
}); */

// quand je me connecterai à ma BDD en ligne (hébergée avec Heroku) :
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

module.exports = sequelize;
