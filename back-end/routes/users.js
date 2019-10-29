// express router is used
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// to get all users
router.route('/').get((req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});


// to add a user
router.route('/add').post((req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    handle: req.body.handle,
    email: req.body.signUpEmail,
    password: req.body.signUpPassword
  }
  
  User.findOne({
    where: {
      email: userData.email
    }
  })
  .then(user => {
    if(!user) {
      // to hash pwd before it is added in DB
      const hash = bcrypt.hashSync(userData.password, 10);
      userData.password = hash;

      User.create(userData)
      .then(() => res.json('Inscription effectuée'))
      .catch(err => res.status(400).json(err));
    } else {
      res.status(400).json('L\'utilisateur est déjà inscrit.')
    }
  })
  .catch(err => {
      res.send(err);
    }) 
  }); 


// to sign in
router.route('/login').post((req, res) => {
  User.findOne({
    where: {
      email: req.body.signInEmail
    }
  })
  .then((user) => {
    // to compare pwd sent by the client and its hashed equivalent in DB
    if(bcrypt.compareSync(req.body.signInPassword, user.password)) {
      req.session.userId = user.id;
      const userHandle = user.handle;
      const userSession = req.session;

      const loggedUserInfo = {
        userSession,
        userHandle
      }
      // when user successfully signs is, a session is created
      console.log(req.session);
      return res.json(loggedUserInfo);
    } else {
      res.json('E-mail et / ou mot de passe non reconnu(s).');
    }
  })
  .catch(err => res.status(400).json(err));
});


// to remove user session when they sign out
router.route('/logout').get((req, res, next) => {
  if (req.session) {   
    console.log(req.session)

    req.session.destroy((err) => {
      if(err) {
        return next(err);
      } else {
        console.log('Session supprimée');
        return res.json('Utilisateur déconnecté et session supprimée.')
      }
    })
  }
})

// router exported to created the related API in index.js which will be made available to the client 
module.exports = router;