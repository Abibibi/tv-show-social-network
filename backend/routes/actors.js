// express prévoit un router, qu'on va utiliser
const router = require('express').Router();
let Actor = require('../models/actor.model');

// router prévoit une fonction route, pour créer une route
// si le front souhaite accéder au Model User :
// il doit faire une requête ajax sur l'API http://localhost:5000/users,
// tel qu'on l'a défini dans le fichier server.js
// si le front souhaite interagir d'une manière avec le Model User
// (à savoir en mode CRUD : 
// que ce soit pour récupérer des infos, 
// pour en ajouter,
// pour supprimer des infos ou les mettre à jour),
// il doit, dans sa requête ajax,
// ajouter la manière dont il veut interagir avec la collection
// à la fin de l'url de l'API.
// ainsi, si le front souhaite récupérer des infos de la collection users
// ce qu'il ajoute à la fin de l'url de l'API, à savoir le endpoint
// est un slash
// il s'agit du même slash que celui qui est indiqué dans la route ci-dessous.
// ainsi, l'url complète de son API
// sera : http://localhost:5000/users/
// ci-dessous, la route pour l'url slash
// prévoie effectivement de mettre à disposition
// les informations concernant le Model User :
router.route('/').get((req, res) => {
  // la méthode find du Model User retourne tous les documents (enregistrements)
  // de la collection users dans mongoDB
  // find retourne une promesse ;
  // on a donc besoin d'un then au cas où la promesse aboutit 
  // et d'un catch en cas d'erreur
  // la réponse retournée est au format JSON
  Actor.find()
    .then(actors => res.json(actors))
    .catch(err => res.status(400).json(err));
});

// ici, nous avons une route en post
// son endpoint est /add
// quand le front fait une requête ajax sur l'API http://localhost:3000/users/add
// vu qu'on est en post, il envoie également une donnée
// ce que veut faire le front, c'est ajouter un nouvel utilisateur dans la collection users de la bdd
// la donnée qu'il envoie est un nom d'utilisateur
// elle est récupérée ici, par le back, dans une variable username
// on créé un nouvel utilisateur en instanciant notre Model User et en lui communiquant le username de ce nouvel user
// et on ajoute ce user dans la bdd grâce à la méthode save du Model User
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const shows = req.body.shows;

  Actor.findOne({name}, (err, actor) => {
    if (err) {
      return res.json(err);
    }

    if (actor) {
      return res.status(400).json("Cet acteur existe déja");
    }
  });

    const newActor = new Actor({
      name,
      image,
      shows
    });

  newActor.save()
    .then(() => res.json('Nouvel acteur ajouté'))
    .catch(err => res.status(400).json(err));
 
}); 



// on exporte le router pour créer, dans le fichier server.js, l'API auquel il sera lié et qui sera à la disposition du front 
module.exports = router;