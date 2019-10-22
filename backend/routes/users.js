// express prévoit un router, qu'on va utiliser
const router = require('express').Router();
let User = require('../models/user.model');

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
  User.find()
    .then(users => res.json(users))
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
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const handle = req.body.handle;
  const email = req.body.signUpEmail;
  const password = req.body.signUpPassword;
  
  User.findOne({email: email}, (err, user) => {
    if (err) {
      return res.json(err);
    }

    if (user) {
      return res.status(400).json("L'utilisateur est déjà inscrit")
    }
  });

    const newUser = new User({
      firstname,
      lastname,
      handle,
      email,
      password
    });

  newUser.save()
    .then(() => res.json('Inscription effectuée'))
    .catch(err => res.status(400).json(err));
 
}); 


// route pour se connecter au site
router.route('/login').post((req, res, next) => {
  const email = req.body.signInEmail;
  const password = req.body.signInPassword;

  User.findOne({email, password})
  .then(() => { 
    // cf. la définition de la méthode statique authenticate
    // dans user.model.js
    User.authenticate(email, password, function (error, user) {
      if (error || !user) {
        var err = new Error('E-mail et / ou mot de passe non reconnu(s).');
        err.status = 401;
        return next(err);
      } else {
        // s'il n'y a pas d'erreur et si l'utilisateur
        // qui essaie de se connecter existe bien dans la bdd
        // on crée une session
        req.session.userId = user._id;
        console.log(req.session);
        console.log('La connexion a réussi');
        return res.json(`Utilisateur connecté. Voici sa session : ${req.session.userId}`);
      }
    });
  })
  .catch(err => res.status(400).json(err));
});

router.route('/logout').get((req, res, next) => {
  if (req.session) {   
    console.log(req.session)

    req.session.destroy((err) => {
      if(err) {
        return next(err);
      } else {
        console.log('Session supprimée');
        return res.json('Utilisateur déconnecté et session supprimée.')
      }
    })
  }
})

// on exporte le router pour créer, dans le fichier server.js, l'API auquel il sera lié et qui sera à la disposition du front 
module.exports = router;