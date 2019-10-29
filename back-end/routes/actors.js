// express router is used
const router = require('express').Router();
let Actor = require('../models/Actor');


// to get all actors
router.route('/').get((req, res) => {
  Actor.findAll()
    .then(actors => res.json(actors))
    .catch(err => res.status(400).json(err));
});


// to add an actor
router.route('/add').post((req, res) => {
  
  const actorData = {
    name: req.body.name,
  } 

  Actor.findOne({
    where: {
      name : actorData.name
    }
  })
  .then(actor => {
    if(!actor) {

      Actor.create(actorData)
      .then(() => res.json('Acteur ou actrice ajouté-e'))
      .catch(err => res.status(400).json(err));
    } else {
      // if actor already in DB
      res.status(400).json('Cet acteur ou cette actrice est déjà enregistré-e.')
    }
  })
  // if error in request
  .catch(err => {
      res.send(err);
    })
 
});


// router exported to created the related API in index.js, which will be made available to the client
module.exports = router;