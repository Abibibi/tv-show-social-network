// express router is used
const router = require('express').Router();
let Director = require('../models/Director');


// to get all directors
router.route('/').get((req, res) => {
  Director.findAll()
    .then(directors => res.json(directors))
    .catch(err => res.status(400).json(err));
});


// to add a director
router.route('/add').post((req, res) => {
  const directorData = {
    name: req.body.name,
  } 

  Director.findOne({
    where: {
      name : directorData.name
    }
  })
  .then(director => {
    if(!director) {

      Director.create(directorData)
      .then(() => res.json('Réalisateur ou réalisatrice ajouté-e'))
      .catch(err => res.status(400).json(err));
    } else {
      // if director already in DB
      res.status(400).json('Ce réalisateur ou cette réalisatrice est déjà enregistré-e.')
    }
  })
  // if error in request
  .catch(err => {
      res.send(err);
    })
 
}); 



// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;