// == Import : npm
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import : local
import './friends.scss';

// == Composant
const Friends = ({
  changeValue,
  submitSearch,
  searchFriendsInput,
  submitSearchFriendsByHandle,
  friendsFiltered,
  getClickedUserId,
  wishFollowOrUnfollow,
  getMyProfile,
  relationships,
}) => {
  useEffect(() => {
    getMyProfile();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    changeValue(value);
    submitSearchFriendsByHandle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSearch();
  };

  const handleFollowClick = (event) => {
    const { id } = event.target;
    getClickedUserId(id);
    wishFollowOrUnfollow();
  };

  return (
    <div className="friends">
      <h1 className="friends-title">Trouve d'autres SerialKillers</h1>
      <form onSubmit={handleSubmit} className="friends-form">
        <input onChange={handleChange} value={searchFriendsInput} className="friends-form-input" type="text" placeholder="Recherche un SerialKiller..." />
      </form>
      <div className="friends-cards">
        {friendsFiltered.map(({
          id,
          handle,
          picture,
          slug,
        }) => {
          const isFriend = relationships.find((relation) => relation.followedUser.id === id);
          console.log(isFriend);
          const buttonClass = classNames({
            'friends-cards-card-button': true,
            'friends-cards-card-button-remove': isFriend,
            'friends-cards-card-button-add': !isFriend,
          });
          const buttonText = isFriend ? 'Se désabonner' : 'S\'abonner';
          return (
            <>
              <div key={id} className="friends-cards-card">
                <Link to={`/profil/${slug}`}>
                  <div className="friends-cards-card-avatar"><img src={picture} alt={`photo de l\'utilisateur ${handle}`} /></div>
                  <p className="friends-cards-card-handle">{handle}</p>
                </Link>
                <button id={id} onClick={handleFollowClick} className={buttonClass} type="button">{buttonText}</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

Friends.propTypes = {
  changeValue: PropTypes.func.isRequired,
  searchFriendsInput: PropTypes.string.isRequired,
  submitSearch: PropTypes.func.isRequired,
  submitSearchFriendsByHandle: PropTypes.func.isRequired,
  friendsFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      handle: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  relationships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      handle: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  getClickedUserId: PropTypes.func.isRequired,
  wishFollowOrUnfollow: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired,
};

// == Export
export default Friends;
