// Models and Fuse module
const Fuse = require('fuse.js');
const Show = require('../models/Show');
const Director = require('../models/Director');
const ShowDirectors = require('../models/ShowDirectors');
const Actor = require('../models/Actor');
const ShowActors = require('../models/ShowActors');
const Genre = require('../models/Genre');
const Review = require('../models/Review');
const User = require('../models/User');


// showController methods

// to get all shows
const getShows = async (req, res) => {
  const allShows = await Show.findAll({
    attributes: ['id', 'title'],
    order: [
      ['title', 'ASC']
    ]
  });
  
  res.json(allShows);
  
};


// to get shows and related genres
const getShowsAndGenres = async (req, res) => {
  const showsAndRelatedGenres = await Show.findAll({
    attributes: ['id', 'slug', 'title'],
    include: [
      {
        model: Genre,
        attributes: ['id', 'slug']
      }
    ]
  });

  res.json(showsAndRelatedGenres);
    
};


// to get one show details from its slug (as sent by client), including its directors, actors and genre name
const getOneShow = async (req, res) => { 
  const slug = req.params.showSlug;
  
  // to find the right show from the slug sent by client
  const show = await Show.findOne({
    where: {
      slug,
    },
    // to require information from Director, Actor and Genre Models
    include: [
    {
      model: Director,
      through: ShowDirectors,
      attributes: ['name'],
      // the "show_have_directors" information is not needed, so it is excluded:
      through: {
        attributes: []
      },
    },
    {
      model: Actor,
      through: ShowActors,
      attributes: ['name'],
      // the "show_have_directors" information is not needed, so it is excluded:
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
      attributes: ['content', 'id', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'handle', 'slug']
        }
      ],
    },
  ],
  // to order one show reviews
  // order needs to be specified at model Show level,
  // not model Review level
  order: [[{ model: Review }, 'id', 'asc']],
  // createdAt or updatedAt attributes are not needed in our show object, so they are excluded:
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
  });
  // response to client now include information on the show, 
  // with info on genre, directors, actors, reviews and users
  res.json(show);
   
};


// to get all shows whose title matches with a searched word
const searchShows = async (req, res) => {
  const wordSearchRequest = req.body.wordSearch;
  let showResults = [];
  
  const showsToFind = await Show.findAll({
    attributes: ['id', 'title', 'picture', 'slug'],
    include: [
      {
        model: Genre,
        attributes: ['id', 'slug']
      }
    ]
  });
  
  const options = {
    caseSensitive: false,
    threshold: 0.35,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title']
  }
  const fuse = new Fuse(showsToFind, options);
  showResults = fuse.search(wordSearchRequest);

  res.json(showResults);
    
}

// exporting showController methods to use them as arguments when executing routes HTTP methods
module.exports = {
  getShows,
  getShowsAndGenres,
  getOneShow,
  searchShows
}