// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import FriendProfile from 'src/components/FriendProfile';

// Action Creators

import {
  getFriendProfile,
  getFollowedOrUnfollowedUserId,
  wantFollowOrUnfollow,
} from 'src/store/reducer/friend';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */

/* Je vais chercher dans le state du reducer serie puis je prends les donnés donc serie.title */
const mapStateToProps = (state) => ({
  friendProfile: state.friend.oneFriend,
  reviews: state.friend.oneFriendReviews,
  relationships: state.friend.oneFriendRelationships,
  ownRelationships: state.user.relationships,
  totalSeries: state.serie.seriesAndRelatedGenres.length,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  getOtherUserProfile: () => {
    const action = getFriendProfile();
    dispatch(action);
  },

  getClickedUserId: (userId) => {
    const action = getFollowedOrUnfollowedUserId(userId);
    dispatch(action);
  },

  wishFollowOrUnfollow: () => {
    const action = wantFollowOrUnfollow();
    dispatch(action);
  },
});

// Container
const FriendProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendProfile);

// == Export
export default FriendProfileContainer;
