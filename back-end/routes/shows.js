// express router is used
const router = require('express').Router();
const Fuse = require('fuse.js');
const Show = require('../models/Show');
const Director = require('../models/Director');
const ShowDirectors = require('../models/ShowDirectors');
const Actor = require('../models/Actor');
const ShowActors = require('../models/ShowActors');
const Genre = require('../models/Genre');
const Review = require('../models/Review');
const User = require('../models/User');

// to get all shows
router.route('/').get((req, res) => {

  Show.findAll({
    attributes: ['id', 'title'],
    order: [
      ['title', 'ASC']
    ]
  })
    .then(shows => res.json(shows))
    .catch(err => res.status(400).json(err));
});


// to get all shows and related genres
router.route('/showsAndRelatedGenres').get((req, res) => {

  Show.findAll({
    attributes: ['id', 'slug', 'title'],
    include: [
      {
        model: Genre,
        attributes: ['id', 'slug']
      }
    ]
  })
  .then((showsAndRelatedGenres) => res.json(showsAndRelatedGenres))
  .catch((err) => res.status(400).json(err))
})


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
// the object we want to send to the client via this endpoint.
// Throughout this route, we will progressively add in properties, via the slug provided and includes.
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
      attributes: ['name', 'slug'],
    },
    {
      model: Review,
      attributes: ['content', 'stars', 'id', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'handle', 'slug']
        }
      ],
    },
  ],
  // to order one show reviews, most recent first
  // order needs to be specified at model Show level,
  // not model Review level
  order: [[{ model: Review }, 'id', 'asc']],
  // we do not need createdAt or updatedAt attributes is our show object, so we exclude them:
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'picture',
        'genres_id'
      ],
      include: [
        'slug',
      ]
    }
  })
  .then((show) => {
    // we fetch all the information on the show available in shows, directors, actors, genres & reviews tables
    responseShow = show;

    // response to the client now include information on the show, directors, actors and genre name included
    return res.json(responseShow);
    
  })
  .catch((err) => {
    // no show was found from the slug provided
    res.status(400).json('La requête n\'a pas abouti');
  })
  
})

// to get all shows whose title matches with a searched word 
router.route('/search').post((req, res) => {
  const wordSearchRequest = req.body.wordSearch;
  let showResults = [];
  
    Show.findAll({
      attributes: ['id', 'title', 'picture', 'slug'],
      include: [
        {
          model: Genre,
          attributes: ['id', 'slug']
        }
      ]
    })
    .then(shows => {
      
        const options = {
          caseSensitive: false,
          threshold: 0.35,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['title']
        }
        const fuse = new Fuse(shows, options);
        showResults = fuse.search(wordSearchRequest);

      return res.json(showResults);
    })
    .catch(err => {
        res.status(400).json('La requête n\'a pas abouti');
    })
  }); 

// router exported to created the related API in index.js, which will be made available to the client 
module.exports = router;