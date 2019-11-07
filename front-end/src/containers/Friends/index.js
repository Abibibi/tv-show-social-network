// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Friends from 'src/components/Friends';

import {
  changeInputFriendsSearch,
  findFriends,
  findFriendsByHandle,
  getFollowedOrUnfollowedUserId,
  wantFollowOrUnfollow,
} from 'src/store/reducer/friend';

import { getOwnProfile } from 'src/store/reducer/user';

/* === State (données) === */
const mapStateToProps = (state) => ({
  searchFriendsInput: state.friend.searchFriendsInput,
  friendsFiltered: state.friend.allFriendsFiltered,
  relationships: state.user.relationships,
});

/* === Actions === */
const mapDispatchToProps = (dispatch) => ({
  changeValue: (value) => {
    const action = changeInputFriendsSearch(value);
    dispatch(action);
  },
  submitSearch: () => {
    const action = findFriends();
    dispatch(action);
  },

  submitSearchFriendsByHandle: () => {
    const action = findFriendsByHandle();
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

  getMyProfile: () => {
    const action = getOwnProfile();
    dispatch(action);
  },
});

// Container
const FriendsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Friends);

// == Export
export default FriendsContainer;
