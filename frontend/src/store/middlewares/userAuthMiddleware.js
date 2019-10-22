import axios from 'axios';

import { DO_SIGNUP, DO_SIGNIN, DO_SIGNOUT, signInSuccess } from 'src/store/reducer/user';

const userAuthMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case DO_SIGNUP: {
      console.log("je veux inscrire l'utilisateur dans la BDD");

      const state = store.getState();

      // c'est à la propriété user du state que j'accède aux informations que je veux envoyer au back
      // en effet, nous avons plusieurs reducers et c'est dans le reducer user (nommé comme tel dans le fichier index.js du dossier reducer)
      // qu'on a accès aux infos de l'utilisateur dans le state
      console.log(state.user);

      // le back met à ma disposition une API pour que je puisse les transmettre les informations
      // dont il a besoin pour communiquer avec la BDD
      axios.post('http://localhost:5000/users/add', state.user)
        .then((response) => {
          console.log("l'utilisateur a bien été inscrit dans la base de données", response);
        })
        .catch((error) => {
          console.log('error', error);
        });
      // on laisse passer DO_SIGNUP dans le reducer
      // afin que le formulaire se vide une fois l'inscription effectuée
      next(action);
      break;
    }
    case DO_SIGNIN: {
      console.log("je veux vérifier si l'utilisateur est déjà inscrit");

      const state = store.getState();

      console.log(state.user);

      axios.post('http://localhost:5000/users/login', state.user)
        .then((response) => {
          console.log("l'utilisateur s'est bien connecté", response);
          
          const signInAction = signInSuccess();
          store.dispatch(signInAction);

        })
        .catch((error) => {
          console.log('error', error);
        });

      next(action);
      break;
    }
    case DO_SIGNOUT: {
      console.log("je veux vérifier si l'utilisateur se déconnecte");

      const state = store.getState();

      console.log(state.user);

      axios.get('http://localhost:5000/users/logout')
        .then((response) => {
          console.log("l'utilisateur s'est bien déconnecté", response);
        })
        .catch((error) => {
          console.log('error', error);
        });

      next(action);
      break;
    }
    default:
      console.log('cette action ne m\'intéresse pas je la laisse paser');
      next(action);
  }
};

export default userAuthMiddleware;
