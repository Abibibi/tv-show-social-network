// Models
const Genre = require('../models/Genre');
const Show = require('../models/Show');


// genreController methods

// to get all genres
const getGenres = async (req, res) => {
  const allGenres = await Genre.findAll();
  
  res.json(allGenres);
  
};


// to get all shows from its genre, with the genre slug as the data sent by the client
const getOneGenreShows = async (req, res) => {
  const slug = req.params.genreSlug;
  console.log(slug);

  // to find the genre with the slug request params as an attribute
  
  const genreShows = await Genre.findOne({
    where : {
      slug,
    },
    // to retrieve all the shows belonging to this genre
    include:[{
      // for this genre, find all data in table shows
        model: Show,
      // retrieves these specific attributes for every show found for this genre
        attributes: ['id', 'title', 'picture', 'slug'],
      }],
    // retrieves these specific attributes for the Genre
    attributes: ['id', 'name', 'image', 'slug'],
  });
  // to send genre shows to client
  res.json(genreShows);
   
};

// exporting genreController methods to use them as arguments when executing routes HTTP methods
module.exports = {
  getGenres,
  getOneGenreShows
}