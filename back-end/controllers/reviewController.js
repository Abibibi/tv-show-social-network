// Models
const Review = require('../models/Review');
const User = require('../models/User');
const Show = require('../models/Show');
const Genre = require('../models/Genre');


// reviewController methods
const getReviews = async (req, res) => {
  const allReviews = await Review.findAll({
    include: [
      {
        // to get the review writer's handle
        model: User,
        attributes: ['id', 'handle', 'slug']
      },
      {
        // to get the show the review is about
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
    // review updatedAt attribute is not needed
    // users_id and shows_id are already provided above
    attributes: {
      exclude: [
        'updatedAt',
        'users_id',
        'shows_id',
      ]
    },
    // to sort reviews by date, oldest first (other sorting can be managed front-side)
    order: [
      ['id', 'ASC']
    ]
  });

  res.json(allReviews);
  
};


const addReview = async (req, res) => {
  // to have at disposal all the info sent by client
  const reviewData = {
    content: req.body.content,
    users_id: req.session.user.id,
    showTitle: req.body.show.title
  }

  // to gather already available info to insert new review into DB
  const newReview = {
    content: reviewData.content,
    users_id: reviewData.users_id,
  };

  // to check if a review has not already been posted by this user for this show
  // for this purpose, review show id is needed, as it is a foreign key (thus a property) in Review
  const reviewShow = await Show.findOne({
    where: {
      title: reviewData.showTitle
    }
  });
  
  const reviewAlreadyInDB = await Review.findOne({
    where: {
      // using both users_id and shows_id to see if the review is not already in DB
      users_id: reviewData.users_id,
      shows_id: reviewShow.id
    }
  });
  
  // if a review has already been posted by this user for this show, it is not inserted into DB
  if(reviewAlreadyInDB) {
    // with throw, following instructions will not be run
    throw new Error('L\'utilisateur a déjà publié un avis sur cette série');

  }

  // if the review has not already been posted by this user for this show, it is inserted into DB
  newReview.shows_id = reviewShow.id;
  await Review.create(newReview);
    
  // confirming review insertion into DB
  res.json('L\'avis a bien été ajouté dans la base de données');
  
};


// exporting reviewController methods to use them as arguments when executing routes HTTP methods
module.exports = {
  getReviews,
  addReview
};