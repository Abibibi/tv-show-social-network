// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// showController
const { getShows, getShowsAndGenres, getOneShow, searchShows } = require('../controllers/showController');
const authMiddleware = require('../utils/authMiddleware');


// to get all shows
router.get('/', authMiddleware, getShows);


// to get all shows and related genres
router.get('/showsAndRelatedGenres', authMiddleware, getShowsAndGenres);


// to get one show details from its slug, including its directors, actors and genre name
router.get('/:showSlug', authMiddleware, getOneShow);


// to get all shows whose title matches with a searched word 
router.post('/search', authMiddleware, searchShows); 


// router exported to create related API in app.js, which will be made available to the client 
module.exports = router;