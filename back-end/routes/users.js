// express router is used
const router = require('express').Router();
const User = require('../models/User');
const Review = require('../models/Review');
const Show = require('../models/Show');
const Genre = require('../models/Genre');
const Relationship = require('../models/Relationship');
const bcrypt = require('bcrypt');
const Fuse = require('fuse.js');

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
      const userSlug = user.slug;
      const userSession = req.session;

      const loggedUserInfo = {
        userSession,
        userHandle,
        userSlug,
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

// to get all user slugs (for Route and Link components on front-side)

router.route('/allFriendSlugs').get((req, res) => {

  User.findAll({
    attributes: ['id', 'slug', 'handle']
  })
  .then((userSlugs) => res.json(userSlugs))
  .catch((err) => res.status(400).json('Les slugs utilisateur n\'ont pas pu être récupérés.'))
});


// to get all users whose handle matches with a searched word 
router.route('/search').post((req, res) => {
  const nameSearchRequest = req.body.nameSearch;
  let userResults = [];
  
    User.findAll({
      attributes: ['id', 'handle', 'picture', 'slug']
    })
    .then(users => {
      
        const options = {
          caseSensitive: false,
          threshold: 0.1,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['handle']
        }
        const fuse = new Fuse(users, options);
        userResults = fuse.search(nameSearchRequest);

      return res.json(userResults);
    })
    .catch(err => {
        res.status(400).json('La requête n\'a pas abouti');
  })
});

// to get info on a user from their id recorded in session
router.route('/:userId').get((req, res) => { 
  const userId = req.params.userId;
  User.findOne({
    where: {
      id: userId,
    },
    include: [
    {
      model: Review,
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Show,
          attributes: ['id', 'title', 'slug'],
          include: [
            {
              model: Genre,
              attributes: ['id', 'name', 'slug']
            }
          ]
        }
      ],
    },
    {
      model: Relationship,
      as: 'relations',
      attributes: {
        exclude: [
          'updatedAd',
          'followedUserId',
          'userId'
        ]
      },
      // to include people followed by user
      include: [
        {
          model: User,
          as: 'followedUser',
          attributes: ['id', 'handle', 'picture', 'slug']
        }
      ]
    }
  ],
  order: [[{ model: Review }, 'id', 'asc']],
  attributes: ['id', 'firstname', 'lastname', 'email', 'handle', 'picture', 'banner', 'slug']
  })
  .then((user) => {

    console.log(user);
    return res.json(user);
  })
  .catch((err) => {
    res.status(400).json('La requête n\'a pas abouti');
  })
});

// to get info on another user (typically, to see their profile pages)
router.route('/friend/:friendSlug').get((req, res) => { 
  const slug = req.params.friendSlug;
  User.findOne({
    where: {
      slug,
    },
    include: [
    {
      model: Review,
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Show,
          attributes: ['id', 'title', 'slug'],
          include: [
            {
              model: Genre,
              attributes: ['id', 'name', 'slug']
            }
          ]
        }
      ],
    },
    {
      model: Relationship,
      as: 'relations',
      attributes: {
        exclude: [
          'updatedAd',
          'followedUserId',
          'userId'
        ]
      },
      // to include people followed by user
      include: [
        {
          model: User,
          as: 'followedUser',
          attributes: ['id', 'handle', 'picture', 'slug']
        }
      ]
    }
  ],
  order: [[{ model: Review }, 'id', 'asc']],
  attributes: ['id', 'firstname', 'lastname', 'email', 'handle', 'picture', 'banner', 'slug']
  })
  .then((user) => {

    console.log(user);
    return res.json(user);
  })
  .catch((err) => {
    res.status(400).json('La requête n\'a pas abouti');
  })
});


// to let a user follow / unfollow another user
router.route('/:userId/follows/:followedUserId').get((req, res) => { 
  const userId = req.params.userId;
  const followedUserId = req.params.followedUserId;

  const followingRecording = {
    userId,
    followedUserId,
  }

  Relationship.findOne({
    where: {
      userId,
      followedUserId
    }
  })
  .then((following) => {
    if (userId === followedUserId) {
      return res.status(400).json('Un membre ne peut pas se follower lui-même ou elle-même')
    }

    if (!following) {
      Relationship.create(followingRecording)
      .then(() => {
        console.log()
        Relationship.findOne({
          where: {
            userId,
            followedUserId
          },
        })
        .then((relationship) => { 
          console.log(relationship)
          User.findOne({
            where: {
              id: relationship.followedUserId
            }
          })
          .then((user) => {
            console.log(user)
            let relationshipToSend = {
              id: relationship.id,
              createdAt: relationship.createdAt,
              updatedAt: relationship.updatedAt,
              followedUser: {
                id: relationship.followedUserId,
                handle: user.handle,
                picture: user.picture,
              }
            };

            res.json(relationshipToSend);

          })               
        })
        .catch((err) => res.status(400).json('Cette relation n\'est pas enregistrée'))

      })
      .catch((err) => res.status(400).json('Cette relation n\'a pas pu être créée'))
    
    } else {

      Relationship.destroy({
        where: {
          userId,
          followedUserId
        }
      })
      res.json(following.id)

    }
    
  })
  .catch((err) => res.status(400).json('La requête n\'a pas abouti.'))

});

// router exported to created the related API in index.js which will be made available to the client 
module.exports = router;