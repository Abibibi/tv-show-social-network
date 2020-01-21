// Models and bcrypt & Fuse modules
const User = require('../models/User');
const Review = require('../models/Review');
const Show = require('../models/Show');
const Genre = require('../models/Genre');
const Relationship = require('../models/Relationship');
const bcrypt = require('bcrypt');
const Fuse = require('fuse.js');


// userController methods

// to check if there is already a session and allow refresh while still being logged front-side
const isAuth = async (req, res) => {
  res.json(req.session.user);
 
};


// to get all users
const getUsers = async (req, res) => {
  const users = await User.findAll();
  
  res.json(users);
  
};

// to sign up
const signUp = async (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    handle: req.body.handle,
    email: req.body.signUpEmail,
    password: req.body.signUpPassword
  }
  
  const tryingUser = await User.findOne({
    where: {
      email: userData.email
    }
  });
  
  // if user is already in DB (thus, has already signed up)
  if(tryingUser) {
    throw new Error('L\'utilisateur est déjà inscrit.')
  }

  // if user not already in DB, adding them to DB
  // to hash pwd before it is added in DB
  const hash = await bcrypt.hash(userData.password, 10);
  userData.password = hash;

  // to give new user a slug for them to have a valid profile URL from the start (see Routes front-side)
  userData.slug = userData.handle.toLowerCase();
  
  await User.create(userData);
  
  res.json('Inscription effectuée');
    
};


// to sign in
const signIn = async (req, res) => {
  const tryingUser = await User.findOne({
    where: {
      email: req.body.signInEmail
    }
  });

  // if user has not signed up
  if(!tryingUser) {
    throw new Error('L\'utilisateur n\'est pas inscrit');
  }

  
  else if
  // if user's pwd matches the crypted one in DB
  (await bcrypt.compare(req.body.signInPassword, tryingUser.password)) {
    // user successfully signs in
    // a session is created with all the info needed as long as the user is logged
    const sessionUserInfo = {
      id: tryingUser.id,
      handle: tryingUser.handle,
      slug: tryingUser.slug
    }
    console.log(req.session);
    req.session.user = sessionUserInfo;
    console.log(req.session);
    // session info is sended to client
    res.json(sessionUserInfo);
  } 

  // if user's pwd does not match the crypted one in DB
  else {
    throw new Error('L\'utilisateur n\'a pas renseigné le bon mot de passe.')
  }
  
};



// to get info on a user from their id recorded in session (to display own profile)
const getSessionUserProfile = async (req, res) => { 
  console.log(req.session.user);
  const userId = req.session.user.id;
  
  const sessionUserInfo = await User.findOne({
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
      // to send to user an array with all their relationships
      model: Relationship,
      as: 'relations',
      attributes: {
        exclude: [
          'followedUserId',
          'userId'
        ]
      },
      // to include in the relationship array info about the people followed by user
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
  });

  res.json(sessionUserInfo);
  
};


// to get all users whose handle matches with a searched word 
const searchUsers = async (req, res) => {
  const nameSearchRequest = req.body.nameSearch;
  let userResults = [];
  
  const usersToFind = await User.findAll({
    attributes: ['id', 'handle', 'picture', 'slug']
  })
  
  const options = {
    caseSensitive: false,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['handle']
  }
  
  const fuse = new Fuse(usersToFind, options);
  userResults = fuse.search(nameSearchRequest);

  res.json(userResults);
    
};


// to get all user slugs (for Route and Link components on front-side)
const getUsersSlugs = async (req, res) => {
  const allUsersSlugs = await User.findAll({
    attributes: ['id', 'slug', 'handle']
  });

  res.json(allUsersSlugs);
    
};


// to get info on another user (typically, to see their profile pages)
const getOtherUserProfile = async (req, res) => { 
  const slug = req.params.friendSlug;
  
  const otherUserInfo = await User.findOne({
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
  });

  res.json(otherUserInfo);
  
    
};


// to let a user follow / unfollow another user
const followUnfollow = async (req, res) => { 
  const { followedUserId } = req.params;
  const userId = req.session.user.id;

  const followingRelationshipInfo = {
    userId,
    followedUserId,
  }

  const existingRelationship = await Relationship.findOne({
    where: {
      userId,
      followedUserId
    }
  });

  // to avoid self-following
  if (userId === followedUserId) {
    res.status(400).json('Un membre ne peut pas s\'abonner à lui-même');

  }

  // to unfollow 
  else if (existingRelationship) {
    await Relationship.destroy({
      where: {
        userId,
        followedUserId
      }
    })
  
  // to send deleted relationship id to client, so relationship can be deleted front-side
  res.json(existingRelationship.id);

  }

  // to follow
  else {
    // to create new relationship in DB
    const newlyInsertedRelationship = await Relationship.create(followingRelationshipInfo);
    
    // to find all info on the followed user in the new relationship
    const newRelationshipFollowedUser = await User.findOne({
      where: {
        id: newlyInsertedRelationship.followedUserId
      }
    });
    
    // to format the new relationship as needed by the front
    const relationshipToSend = {
      id: newlyInsertedRelationship.id,
      createdAt: newlyInsertedRelationship.createdAt,
      updatedAt: newlyInsertedRelationship.updatedAt,
      followedUser: {
        id: newRelationshipFollowedUser.id,
        handle: newRelationshipFollowedUser.handle,
        picture: newRelationshipFollowedUser.picture,
      }
    };

  // sending newly inserted relationship to client
  res.json(relationshipToSend);
      
  }
    
};


// to delete a user session when they sign out
const logout = async (req, res) => {
  if (req.session) {   
    console.log(req.session);

    await req.session.destroy();
    
    console.log('Session supprimée');
    console.log(req.session);
    res.json('Utilisateur déconnecté et session supprimée.');
  }
};


// exporting userController methods to use them as arguments when executing routes HTTP methods
module.exports = {
    isAuth,
    getUsers,
    signUp,
    signIn,
    getSessionUserProfile,
    searchUsers,
    getUsersSlugs,
    getOtherUserProfile,
    followUnfollow,
    logout,
};
