// express router is used
const router = require('express').Router();
const Show = require('../models/Show');
const Director = require('../models/Director');
const ShowDirectors = require('../models/ShowDirectors');
const Actor = require('../models/Actor');
const ShowActors = require('../models/ShowActors');
const Genre = require('../models/Genre');


// to get all shows
router.route('/').get((req, res) => {

  Show.findAll()
    .then(shows => res.json(shows))
    .catch(err => res.status(400).json(err));
});


// to add a show
router.route('/add').post((req, res) => {

  const showData = {
    title: req.body.title,
    picture: req.body.picture,
    trailer: req.body.trailer,
    year: req.body.year,
    summary: req.body.summary,
    genres_id: req.body.genres_id
  }

  Show.findOne({
    where: {
      title: showData.title
    }
  })
  .then(show => {
    if(!show) {

      Show.create(showData)
      .then(() => res.json('Série créée'))
      .catch(err => res.status(400).json(err));
    } else {
      res.status(400).json('Cette série existe déjà.')
    }
  })
  .catch(err => {
      res.status(400).json('La requête n\'a pas abouti');
  })
 
}); 

// to get one show details from its slug, including its directors, actors and genre name
router.route('/:showSlug').get((req, res) => { 
  const slug = req.params.showSlug;
// the object we want to send to the client via this endpoint. Throughout this route, we will progressively add in properties.
  let responseShow = {};
// to find the right show from the slug sent by the client
  Show.findOne({
    where: {
      slug,
    },
    // to require information from Director, Actor and Genre Models
    // in each Model, only name attribute is needed
    include: [
    {
      model: Director,
      through: ShowDirectors,
      attributes: ['name'],
      // the "show_have_directors" information is not needed, so we exclude it:
      through: {
        attributes: []
      },
    },
    {
      model: Actor,
      through: ShowActors,
      attributes: ['name'],
      // the "show_have_directors" information is not needed, so we exclude it:
      through: {
        attributes: []
      }
    },
    {
      model: Genre,
      attributes: ['name'],
    }
  ],
  // we do not need createdAt or updatedAt attributes is our show object, so we exclude them:
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt'
      ]
    }
  })
  .then((show) => {
    // we fetch all the information on the show available in shows table
    responseShow = show;
    show.getDirectors().then((directors) => {
      // we add the directors as extra information on the show
      responseShow.directors = directors;
      // OR:
      // responseShow.setDataValue('directors', directors);
      // (show properties are available in the object dataValues (run console.log(responseShow) to see them))
    })

    show.getActors().then((actors) => {
      // we add the actors as extra information on the show
      responseShow.actors = actors;
      // responseShow.setDataValue('actors', actors);
    })
  
    Genre.findOne({
      where: {
        id: show.genres_id
      },
    })
    .then((genre) => {
      // we add the genre as extra information on the show
      responseShow.genre = genre;
     // responseShow.setDataValue('genre', genre.name);

     // response to the client now include information on the show, directors, actors and genre name included
     return res.json(responseShow);
    })
    
  })
  
}) 

// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;