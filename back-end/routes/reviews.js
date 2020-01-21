// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// reviewController
const { getReviews, addReview } = require('../controllers/reviewController');
const authMiddleware = require('../utils/authMiddleware');


// to get all reviews on the homepage
router.get('/', authMiddleware, getReviews);


// to add a review
router.post('/add', authMiddleware, addReview); 


// router exported to create related API in app.js, which will be made available to the client 
module.exports = router;