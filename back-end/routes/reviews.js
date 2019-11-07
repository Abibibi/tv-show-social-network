// express router is used
const router = require('express').Router();
const Review = require('../models/Review');
const User = require('../models/User');
const Show = require('../models/Show');
const Genre = require('../models/Genre');


// to get all reviews on the homepage
router.route('/').get((req, res) => {
  Review.findAll({
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
        'stars'
      ]
    },
    // to sort reviews by date, oldest first (other sorting can be managed front-side)
    order: [
      ['id', 'ASC']
    ]
  })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
});


// to add a review
router.route('/add').post((req, res) => {
  const reviewData = {
    content: req.body.content,
    /* stars: req.body.stars, */
    users_id: req.body.user.id,
    showTitle: req.body.show.title
  }

  let showId = '';

  const newReview = {
    content: reviewData.content,
    users_id: reviewData.users_id,
  };

  Show.findOne({
    where: {
      title: reviewData.showTitle
    }
  })
  .then((show) => {
    showId = show.id;
    console.log(showId);

    Review.findOne({
      where: {
        users_id: reviewData.users_id,
        shows_id: showId
      }
    })
    .then((review) => {
      if(!review) {
        
        newReview.shows_id = showId;
        // review added in DB
        Review.create(newReview)
        .then(() => {
          Review.findOne({
            where: {
              content: reviewData.content,
            },
            include: [
              {
                model: User,
                attributes: ['id','handle']
              },
              {
                model: Show,
                attributes: ['title']
              }
          ]
          })
          .then((review) => {
           let reviewToSend = {
            id: review.id, 
            createdAt: review.createdAt,
             content: review.content,
             user: {
               id: review.user.id,
               handle: review.user.handle
             },
             show: {
               title: review.show.title
             }
           }
            res.json(reviewToSend)
          
          })
          // if users_id / shows_id values are not in DB
          .catch(err => res.status(400).json('Les paramètres transmis pour enregistrer un avis sont invalides'));

        })
      } else {
        // if user has already posted a review for the show
        res.status(400).json('L\'utilisateur a déjà posté un avis.')
      }
        
    })
    .catch(err => {
      // if userId / showId properties are not present in request
        res.status(400).json('Les paramètres transmis ne permettent pas de rechercher l\'existence d\'un avis sur la série pour un utilisateur donné');
      }) 
  })
  .catch(err => res.status(400).json('Le titre de la série de l\'avis à ajouter n\'existe pas dans la base de données.'))
  
  }); 


// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;