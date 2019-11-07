// express router is used
const router = require('express').Router();
let Chatmessage = require('../models/Chatmessage');
const User = require('../models/User');


// to get all chat messages with associated usernames
router.route('/').get((req, res) => {
    Chatmessage.findAll()
      .then(messages => {
        Chatmessage.findAll({
            include: [{
                model: User,
                attributes: ['id', 'handle'],
            }],
            attributes: ['id', 'content', 'createdAt'],
        })
        .then(messages => {
            res.json(messages)
        })
        .catch(err => res.status(400).json(err + 'je n\'obtiens pas les users'))
    })
      .catch(err => res.status(400).json(err + 'je n\'obtiens pas les messages'));
  });


// to add a new chat message in the database
router.route('/add').post((req, res) => {
    const userMessage = {
        content: req.body.content,
        users_id: req.body.user.id,
    }

    Chatmessage.create(userMessage)
    .then(() => res.json('Message chat ajouté'))
    .catch(err => res.status(400).json(err + 'Le message n\'a pas pu être ajouté'))
})


// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;