const mongoose = require('mongoose');

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
const reviewSchema = new Schema({
    content: { type: String, required: true },
    stars: { type: String, required: true },
    show: { type: Schema.Types.ObjectId, ref: 'Show' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  }, {
    // équivalent de created_at et updated_at
    timestamps: true,
  });

// on crée un modèle User
// pour le modèle User, on va utiliser le schéma userSchema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;