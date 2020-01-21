// Models
const Chatmessage = require('../models/Chatmessage');
const User = require('../models/User');


// chatmessageController methods

// to get all chat messages
const getChatmessages = async (req, res) => {
    const allChatMessages = await Chatmessage.findAll({
        include: [{
            model: User,
            attributes: ['id', 'handle'],
        }],
        attributes: ['id', 'content', 'createdAt'],
    });

    res.json(allChatMessages);

};

// to add a new chat message into DB
const addChatmessage = async (req, res) => {
    const userMessage = {
        content: req.body.content,
        users_id: req.session.user.id,
    };

    await Chatmessage.create(userMessage);
    
    res.json('Message chat ajouté');
    
};


// exporting chatmessageController methods to use them as arguments when executing routes HTTP methods
module.exports = {
    getChatmessages,
    addChatmessage
};