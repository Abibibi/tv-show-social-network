import axios from 'axios';

import {
  FIND_FRIENDS,
  FIND_FRIENDS_BY_HANDLE,
  receiveFriendsFiltered,
  WANT_FOLLOW_OR_UNFOLLOW,
  GET_FRIEND_PROFILE,
  receiveFriendProfile,
  GET_FRIEND_SLUGS,
  receiveFriendSlugs,
} from 'src/store/reducer/friend';

import { doFollow, doUnfollow } from 'src/store/reducer/user';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FIND_FRIENDS: {
      console.log('Je veux envoyer un mot pour effectuer une recherche de SerialKillers');

      const state = store.getState();

      const wordSearchRequest = state.friend.searchFriendsInput;

      const word = {
        nameSearch: wordSearchRequest,
      };

      console.log(wordSearchRequest);

      axios.post('http://localhost:5000/users/search', word, { withCredentials: true })
        .then((response) => {
          console.log('Je recois les suggestions SerialKillers en rapport avec le mot envoyé', response.data);

          const allFriendsButMe = response.data.filter((friend) => friend.id !== state.user.sessionUserId);
          store.dispatch(receiveFriendsFiltered(allFriendsButMe));
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case FIND_FRIENDS_BY_HANDLE: {
      console.log('Je veux envoyer un mot pour effectuer une recherche de SerialKillers');

      const state = store.getState();

      const wordSearchRequest = state.friend.searchFriendsInput;

      const word = {
        nameSearch: wordSearchRequest,
      };

      console.log(wordSearchRequest);

      axios.post('http://localhost:5000/users/search', word, { withCredentials: true })
        .then((response) => {
          console.log('Je recois les suggestions SerialKillers en rapport avec le mot envoyé', response.data);
          store.dispatch(receiveFriendsFiltered(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case WANT_FOLLOW_OR_UNFOLLOW: {
      console.log('Je veux suivre ou ne plus suivre un utilisateur');

      const state = store.getState();

      const followedUserId = state.friend.clickedfollowedOrUnfollowedUser;

      axios.get(`http://localhost:5000/users/follows/${followedUserId}`, { withCredentials: true })
        .then((response) => {
          console.log('Je suis ou ne suis plus cet utilisateur', response.data);
          console.log(response);
          
          if (response.data.followedUser) {
            const followAction = doFollow(response.data);
            store.dispatch(followAction);
          }
          else {
            const unFollowAction = doUnfollow(response.data);
            store.dispatch(unFollowAction);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case GET_FRIEND_PROFILE: {
      console.log('Je veux recevoir les infos du profil d\'un autre utilisateur');

      const friendSlug = window.location.pathname.split('/').pop();

      console.log(friendSlug);

      axios.get(`http://localhost:5000/users/friend/${friendSlug}`, { withCredentials: true })
        .then((response) => {
          console.log('Je récupère bien les infos du profil de cet utilisateur', response.data);
          
          const profileInfos = response.data;
          const displayProfile = receiveFriendProfile(profileInfos);
          store.dispatch(displayProfile);
        })
        .catch((error) => {
          console.log('error', error);
        });
      next(action);
      break;
    }
    case GET_FRIEND_SLUGS: {
      console.log('Je veux recevoir le slug de chaque utilisateur');

      axios.get('http://localhost:5000/users/allFriendSlugs', { withCredentials: true })
        .then((response) => {
          console.log('Je récupère bien le slug de chaque utilisateur', response.data);
          
          const state = store.getState();

          const allFriendSlugs = response.data.filter((friendSlug) => friendSlug.slug !== state.user.sessionUserSlug);
          const catchingAllFriendSlugsAction = receiveFriendSlugs(allFriendSlugs);
          store.dispatch(catchingAllFriendSlugsAction);
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

export default searchMiddleware;
