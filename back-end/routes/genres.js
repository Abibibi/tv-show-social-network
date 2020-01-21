// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// genreController
const { getGenres, getOneGenreShows } = require('../controllers/genreController');
const authMiddleware = require('../utils/authMiddleware');


// to get all genres
router.get('/', authMiddleware, getGenres);


// to get all shows from its genre, with the genre slug as the data sent by the client
router.get('/:genreSlug', authMiddleware, getOneGenreShows);


// router exported to create related API in index.js, which will be made available to the client 
module.exports = router;