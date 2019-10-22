const mongoose = require('mongoose');
const validate = require('mongoose-validator');

// Mongoose met à disposition Schema 
// Schema permet de définir la structure d'une collection (équivalent d'une table)
const Schema = mongoose.Schema;

const urlValidator = [
    validate({
        validator: 'isURL',
        passIfEmpty: false,
        message: 'CeciEstUneUrlValide',
      }),
    ]
// notre collection prend deux objets
// le 1er objet contient, en propriété,
// l'équivalent d'un (ou de plusieurs) attribut(s) dans une table
// ici, il s'agit de firstname, lastname, handle, email et password
// timestamps, qui est l'équivalent de created_at et de updated_at
// est dans un 2nd objet à part
// nos objets ont en valeur des informations qui s'apparentent aux colonnes d'un attribut dans une bdd tabulaire dans phpmyadmin
// type correspond à la colonne type,
// required à la colonne Null...
const showSchema = new Schema({
    title: { type: String, required: true },
    image: {
        type: String,
        required: true,
        validate: urlValidator
    },
    trailer: {
        type: String,
        required: false,
        validate: urlValidator
    },
    year: { type: Number, required: true },
    summary: { type: String, required: true },
    // une série peut être réalisée par plusieurs réalisateurs
    // j'ajoute donc comme propriété un tableau de réalisateurs, avec :
    // l'id de chaque réalisateur,
    // le modèle auquel chaque réalisateur est lié.
    directors: [{
      type: Schema.Types.ObjectId,
      ref: 'Director'
    }],
    actors: [{
      type: Schema.Types.ObjectId,
      ref: 'Actor'
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }]
  }, {
    // équivalent de created_at et updated_at
    timestamps: true,
  });


// on crée un modèle User
// pour le modèle User, on va utiliser le schéma userSchema
const Show = mongoose.model( 'Show', showSchema);

module.exports = Show;