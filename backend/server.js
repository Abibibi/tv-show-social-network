// MODULES

// express : framework avec plusieurs fonctionnalités
// pour créer notre application.
// pour créer une application avec express,
// on exécute express : express() et on stocke cette exécution dans une variable app.
// grâce à express, on peut enrichir notre application de plusieurs fonctionnalités :
// -- les middlewares :
// ce sont des fonctions intermédiaires entre la requête cleint et la réponse serveur
// ainsi, les middlewares viennent enrichir la requête ou la réponse, avant que les instructions liées à une route ne s'effectuent.
// voici comme exécuter des middlewares : app.use();
// ex de middlewares : cors, bodyParser (cf. ci-dessous)
// -- les routes, qu'on exécute ainsi : app.get(), app.post()...
const express = require('express');

// middleware cors : pour faire du partage de ressources
// entre domaines différents
// pertinent ici, puisque :
// notre back est sur le port 5000,
// notre front sur le port 3000
const cors = require('cors');

// pour communiquer avec notre bdd MongoDB
const mongoose = require('mongoose');

// pour créer des sessions
const session = require('express-session');

// pour stocker les sessions dans la bdd
const MongoStore = require('connect-mongo')(session);

// pour avoir nos variables d'environnement
// dans un fichier dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// CONNEXION BDD

// uri : là où est stockée notre BDD
// on doit récupérer cette info du tableau de bord Atlas de MongoDB
const uri = process.env.ATLAS_URI;
// 3 options : useNewUrlParser, useCreateIndex et useUnifiedTopology: true
// ces flags permettent de gérer les mises à jour de MongoDB
// -- useNewUrlParser: true = le driver Nodejs de MongoDB
// a réécrit l'outil qu'il utilise pour parser les strings de connexion à MongoDB,
// on indique qu'on souhaite utiliser ce nouvel outil, pas l'ancien
// ainsi, on évite de voir apparaître un avertissement indiquant
// que l'outil précédent a été déprécié 
// et nous invitant à utiliser le nouveau (on gagne du temps) 
// -- useCreateIndex: true = avant, mongodb utilisait la fonction ensureIndex
// elle a été dépréciée
// on indique donc qu'on veut utiliser la nouvelle, à savoir createIndex
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// MIDDLEWARES

app.use(session({
  secret: 'serialkillerbestproject',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: connection
  })
}));
app.use(cors());
// body-parser n'est plus nécessaire pour parser les informations en JSON,
// on peut directement utiliser express :
app.use(express.json());





// ROUTES & API

// on require notre Router pour le Model User
const usersRouter = require('./routes/users');
const genresRouter = require('./routes/genres');
const showsRouter = require('./routes/shows');
const directorsRouter = require('./routes/directors');
const actorsRouter = require('./routes/actors');
const reviewsRouter = require('./routes/reviews');

// on crée une API pour notre router User :
// si, à la suite de notre url racine (soit localhost:5000)
// quelqu'un (notre front, en l'occurence) tape /users
// il obtiendra les informations envoyées par les routes du Router User
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/shows', showsRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/reviews', reviewsRouter);

// PORT

// méthode listen pour écouter notre serveur sur un port (ici, 5000)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});