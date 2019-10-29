// express router is used
const router = require('express').Router();
let Genre = require('../models/Genre');
let Show = require('../models/Show');


// to get all genres
router.route('/').get((req, res) => {
  Genre.findAll()
    .then(genres => res.json(genres))
    .catch(err => res.status(400).json(err));
  });


// to add a genre
router.route('/add').post((req, res) => {

  const genreData = {
    name: req.body.name,
    image: req.body.image
  }

  Genre.findOne({
    where: {
      name: genreData.name
    }
  })
  .then(genre => {
    if(!genre) {

      Genre.create(genreData)
      .then(() => res.json('Genre créé'))
      .catch(err => res.status(400).json(err));
    } else {
      res.status(400).json('Ce genre existe déjà.')
    }
  })
  .catch(err => {
      res.send(err);
    })
});


// to get all shows from its genre, with the genre slug as the data sent by the client
router.route('/:genreSlug').get((req, res) => {
  const slug = req.params.genreSlug;
  console.log(slug);
  let genreIdBySlug = '';

  // to find the genre with the slug request params as an attribute
  Genre.findOne({
    where : {
      slug,
    }
  })
  .then((genre) => {
    genreIdBySlug = genre.id;
    console.log(genreIdBySlug);
    
    Genre.findOne({
      include:[{
        // for this genre, find all data in table shows
          model: Show,
        // retrieves these specific attributes for every show found for this genre
          attributes: ['id', 'title', 'picture', 'slug'],
          // genre_id is an a foreign key in shows table.
          // allows us to find all the shows which have the genre id as a foreign key
          where: { genres_id: genreIdBySlug }
        }],
      // retrieves these specific attributes for the Genre
      attributes: ['id', 'name', 'image'],
      })
      // retrieves all the shows belonging to this genre
      .then(genre => res.json(genre))
      //if no show is found for this genre
      .catch(err => res.status(400).json(err));
  })
  // if slug in params is not found in any genre
  .catch((err) => res.status(400).json(err));
});

// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;