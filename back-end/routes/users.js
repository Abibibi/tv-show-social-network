// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// Controller
const {
    isAuth,
    getUsers,
    signUp,
    signIn,
    getSessionUserProfile,
    searchUsers,
    getUsersSlugs,
    getOtherUserProfile,
    followUnfollow,
    logout
} = require('../controllers/userController');

const authMiddleware = require('../utils/authMiddleware');


// to send session info to front, to remain logged in even after refreshing or leaving page
router.get('/isAuth', authMiddleware, isAuth);


// to get all users
router.get('/', authMiddleware, getUsers);


// to sign up
router.post('/add', signUp);


// to sign in
router.post('/login', signIn);


// to get info on a user from their id recorded in session (to display own profile)
router.get('/ownProfile', authMiddleware, getSessionUserProfile);


// to get all users whose handle matches with a searched word 
router.post('/search', authMiddleware, searchUsers);


// to get all user slugs (for Route and Link components on front-side)
router.get('/allFriendSlugs', authMiddleware, getUsersSlugs);


// to get info on another user (typically, to see their profile pages)
router.get('/friend/:friendSlug', authMiddleware, getOtherUserProfile);


// to let a user follow / unfollow another user
router.get('/follows/:followedUserId', authMiddleware, followUnfollow);


// to delete a user session when they sign out
router.get('/logout/bye', authMiddleware, logout);


// router exported to create related API in app.js which will be made available to the client 
module.exports = router;