// express router is used
const router = require('express').Router();
let Review = require('../models/Review');


// to get all reviews
router.route('/').get((req, res) => {
  Review.findAll()
    .then(review => res.json(review))
    .catch(err => res.status(400).json(err));
});


// to add a review
router.route('/add').post((req, res) => {
  const reviewData = {
    content: req.body.content,
    stars: req.body.stars,
    users_id: req.body.users_id,
    shows_id: req.body.shows_id
  }

  Review.create(reviewData)
  .then(() => res.json('Avis ajouté'))
  .catch(err => res.status(400).json(err));
 
}); 


// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;