const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// pour s'assurer que l'adresse email soit unique
const mongooseUniqueValidator = require('mongoose-unique-validator');

// Mongoose met à disposition Schema 
// Schema permet de définir la structure d'une collection (équivalent d'une table)
const Schema = mongoose.Schema;

// notre collection prend deux objets
// le 1er objet contient, en propriété,
// l'équivalent d'un (ou de plusieurs) attribut(s) dans une table
// ici, il s'agit de firstname, lastname, handle, email et password
// timestamps, qui est l'équivalent de created_at et de updated_at
// est dans un 2nd objet à part
// nos objets ont en valeur des informations qui s'apparentent aux colonnes d'un attribut dans une bdd tabulaire dans phpmyadmin
// type correspond à la colonne type,
// required à la colonne Null...
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    handle: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, {
    // équivalent de created_at et updated_at
    timestamps: true,
  });

  // J'enrichis mon userSchema du module qui permet de s'assurer que l'email est bien unique dans la collection
  userSchema.plugin(mongooseUniqueValidator);
  
  // méthode qui sera appelée dans la route /login
  userSchema.statics.authenticate = (email, password, callback) => {
    // on cherche si l'email de l'utilisateur essayant de se connecter 
    // existe bien dans la collection users, représentée par le Model User
    User.findOne({ email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        // si l'email existe bien, on compare le mdp qu'il a entré
        // avec le mdp dans la bdd
        bcrypt.compare(password, user.password, function (err, result) {
          // si les mdp correspondent,
          // on exécute une méthode callback qu'on définira dans la route /login
          // s'il n'y a pas d'erreur (situtation prévue ci-dessous avec le null en premier argument de callback),
          // cette méthode callback prévoit
          // la création d'une session
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }

// pre est un prehook qu'on ajoute au schema mongoose
// il permet d'exécuter une fonction avant que ne s'exécute celle d'en dessous,
// à savoir la création du Model User à partir du schema mongoose ci-dessus
// ainsi, le prehook enrichit le userSchema avant la création du Model User
// on veut préciser que le password doit être encrypté
// on utilise pour ce faire le module bcrypt et on exécute la fonction hash :
userSchema.pre('save', function (next) {
  // pour que this représente bien un document dans la collection users (représentée par le Model User, construit à partir du userSchema)
  // on utilise des fonctions classiques, pas des fléchées
  // précision : pour faire des tests (ajouter des utiliteurs à la bdd sur postman pour voir si l'encryptage fonctionne bien, pour voir ses console.log),
  // bien relancer le serveur à chaque fois !
  var user = this;
  console.log(user);
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    console.log(hash);
    next();
  })
});

// on crée un modèle User
// pour le modèle User, on va utiliser le schéma userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;