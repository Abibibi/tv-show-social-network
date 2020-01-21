// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// chatmessageController
const { getChatmessages, addChatmessage } = require('../controllers/chatmessageController');
const authMiddleware = require('../utils/authMiddleware');


// to get all chat messages with associated usernames
router.get('/', authMiddleware, getChatmessages);


// to add a new chat message in the database
router.post('/add', authMiddleware, addChatmessage);


// router exported to create related API in app.js, which will be made available to the client 
module.exports = router;