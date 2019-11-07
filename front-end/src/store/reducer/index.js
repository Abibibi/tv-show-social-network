// ici je vais trouver le reducer parent dans lequel je vais combiner mes reducers

// redux fourni une fonction combineReducers qui combine plusieurs reducer en 1
import { combineReducers } from 'redux';

// on importe chacun des sous-reducers
import user from './user';
import genre from './genre';
import serie from './serie';
import chat from './chat';
import review from './review';
import search from './search';
import friend from './friend';

// combineReducers nous retourne le reducer parent généré
// on doit fournir en paramètre un objet
// avec en clé un nom donné à chaque reducer et en valeur, chaque fonction reducer
// https://redux.js.org/api/combinereducers
const reducer = combineReducers({
  // user: user
  user,
  genre,
  serie,
  chat,
  review,
  search,
  friend,
});

// Export
export default reducer;
