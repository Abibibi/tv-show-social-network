import axios from 'axios';

import {
  IS_AUTH,
  userAlreadyAuthenticated,
  DO_SIGNUP,
  signUpSuccess,
  signUpFail,
  DO_SIGNIN,
  DO_SIGNOUT,
  signInSuccess,
  signInFail,
  signOutSuccess,
  GET_OWN_PROFILE,
  receiveOwnProfile,
} from 'src/store/reducer/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case IS_AUTH: {
      console.log("je veux vérifier si l'utilisateur est déjà connecté - soit, s'il a déjà une session côté back");

      axios.get('http://localhost:5000/users/isAuth', { withCredentials: true })
      .then((response) => {
        // dans le response.data, on récupère un cookie comme le prévoit le back
        console.log("l'utilisateur est bien déjà connecté", response.data);

        const alreadyAuthenticatedAction = userAlreadyAuthenticated(response.data);
        store.dispatch(alreadyAuthenticatedAction);
      })
      .catch((error) => {
        console.log('error', error);

      });

      next(action);
      break;
    }
    case DO_SIGNUP: {
      console.log("je veux inscrire l'utilisateur dans la BDD");

      const state = store.getState();

      // c'est à la propriété user du state que j'accède
      // aux informations que je veux envoyer au back
      // en effet, nous avons plusieurs reducers et c'est dans le reducer user
      // (nommé comme tel dans le fichier index.js du dossier reducer)
      // qu'on a accès aux infos de l'utilisateur dans le state
      console.log(state.user);

      // le back met à ma disposition une API pour que je puisse les transmettre les informations
      // dont il a besoin pour communiquer avec la BDD
      axios.post('http://localhost:5000/users/add', state.user, { withCredentials: true })
        .then((response) => {
          console.log(response);

          store.dispatch(signUpSuccess());
        })
        .catch((error) => {
          console.log('error', error);

          store.dispatch(signUpFail());
        });
      // on laisse passer DO_SIGNUP dans le reducer
      // afin que le formulaire se vide une fois l'inscription effectuée
      next(action);
      break;
    }
    case DO_SIGNIN: {
      console.log("je veux vérifier si l'utilisateur est déjà inscrit");

      const state = store.getState();
      
      const { signInEmail, signInPassword } = state.user;

      axios.post('http://localhost:5000/users/login', { signInEmail, signInPassword }, { withCredentials: true })
      .then((response) => {
        // dans le response.data, on récupère un cookie comme le prévoit le back
        console.log("l'utilisateur s'est bien connecté", response.data);

        const signInAction = signInSuccess(response.data);
        store.dispatch(signInAction);
      })
      .catch((error) => {
        console.log('error', error);

        store.dispatch(signInFail());
      });

      next(action);
      break;
    }
    case DO_SIGNOUT: {
      console.log("je veux vérifier si l'utilisateur se déconnecte");

      const state = store.getState();

      console.log(state.user);

      axios.get('http://localhost:5000/users/logout/bye', { withCredentials: true })
        .then((response) => {
          console.log("l'utilisateur s'est bien déconnecté", response);
          
          const signOutAction = signOutSuccess();
          store.dispatch(signOutAction); 
        })
        .catch((error) => {
          console.log('error', error);
        });

      next(action);
      break;
    }
    case GET_OWN_PROFILE: {
      console.log('Je veux recevoir les infos de profil de la session courante');
      
      axios.get(`http://localhost:5000/users/ownProfile`, { withCredentials: true })
        .then((response) => {
          console.log('Je récupère bien les infos du profil', response.data);
          
          const profileInfos = response.data;
          const displayProfile = receiveOwnProfile(profileInfos);
          store.dispatch(displayProfile);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
