// - initialState
const initialState = {
  searchFriendsInput: '',
  allFriendsFiltered: [],
  clickedfollowedOrUnfollowedUser: '',
  oneFriend: {},
  oneFriendReviews: [],
  oneFriendRelationships: [],
  friendSlugs: [],
};

// - Actions Types
const CHANGE_INPUT_FRIENDS_SEARCH = 'CHANGE_INPUT_FRIENDS_SEARCH';
export const FIND_FRIENDS = 'FIND_FRIENDS';
const RECEIVE_FRIENDS_FILTERED = 'RECEIVE_FRIENDS_FILTERED';
export const FIND_FRIENDS_BY_HANDLE = 'FIND_FRIENDS_BY_HANDLE';
const GET_FOLLOWED_OR_UNFOLLOWED_USER_ID = 'GET_FOLLOWED_OR_UNFOLLOWED_USER_ID';
export const WANT_FOLLOW_OR_UNFOLLOW = 'WANT_FOLLOW_OR_UNFOLLOW';
export const GET_FRIEND_PROFILE = 'GET_FRIEND_PROFILE';
export const RECEIVE_FRIEND_PROFILE = 'RECEIVE_FRIEND_PROFILE';
export const GET_FRIEND_SLUGS = 'GET_FRIEND_SLUGS';
const RECEIVE_FRIEND_SLUGS = 'RECEIVE_FRIEND_SLUGS';

// - Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_FRIENDS_SEARCH:
      return {
        ...state,
        searchFriendsInput: action.value,
      };
    case RECEIVE_FRIENDS_FILTERED:
      return {
        ...state,
        allFriendsFiltered: action.friends,
      };
    case FIND_FRIENDS:
      return {
        ...state,
        searchFriendsInput: '',
      };
    case FIND_FRIENDS_BY_HANDLE:
      return {
        ...state,
      };
    case GET_FOLLOWED_OR_UNFOLLOWED_USER_ID:
      return {
        ...state,
        clickedfollowedOrUnfollowedUser: action.userId,
      };
    case RECEIVE_FRIEND_PROFILE:
      return {
        ...state,
        oneFriend: action.profile,
        oneFriendReviews: action.profile.reviews,
        oneFriendRelationships: action.profile.relations,
      };
    case RECEIVE_FRIEND_SLUGS:
      return {
        ...state,
        friendSlugs: action.friendSlugs,
      };
    default:
      return state;
  }
};

// - Actions Creators
export const changeInputFriendsSearch = (value) => ({
  type: CHANGE_INPUT_FRIENDS_SEARCH,
  value,
});

export const findFriends = () => ({
  type: FIND_FRIENDS,
});

export const findFriendsByHandle = () => ({
  type: FIND_FRIENDS_BY_HANDLE,
});

export const receiveFriendsFiltered = (friends) => ({
  type: RECEIVE_FRIENDS_FILTERED,
  friends,
});

export const getFollowedOrUnfollowedUserId = (userId) => ({
  type: GET_FOLLOWED_OR_UNFOLLOWED_USER_ID,
  userId,
});

export const wantFollowOrUnfollow = () => ({
  type: WANT_FOLLOW_OR_UNFOLLOW,
});

export const getFriendProfile = () => ({
  type: GET_FRIEND_PROFILE,
});

export const receiveFriendProfile = (profile) => ({
  type: RECEIVE_FRIEND_PROFILE,
  profile,
});

export const getFriendSlugs = () => ({
  type: GET_FRIEND_SLUGS,
});

export const receiveFriendSlugs = (friendSlugs) => ({
  type: RECEIVE_FRIEND_SLUGS,
  friendSlugs,
});

// - Selectors

// - Export
export default reducer;
