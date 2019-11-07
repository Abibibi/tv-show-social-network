
// == Import : npm
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './profile.scss';
import Progress from 'src/components/Profile/Progress';
import { formatDate } from 'src/store/selectors';

// == Composant
const Profile = ({
  ownProfile: {
    handle,
    picture,
    banner,
    firstname,
    lastname,
    email,
  },
  reviews,
  relationships,
  getMyProfile,
  totalSeries,
}) => {
  useEffect(() => {
    getMyProfile();
  }, []);
  
  const reviewCount = reviews.length;

  const reviewNumber = reviewCount > 1 ? 'postés' : 'posté';

  const addiction = reviewCount * 100 / totalSeries;

  console.log(totalSeries);
  console.log(addiction);

  return (
    <div className="profil">
      <div className="profil-box">
        <div className="profil-box-avatar">
          <div className="profil-box-avatar-banner">
            <img src={banner} alt="banner" />
          </div>
          <div className="profil-box-avatar-picture">
            <img src={picture} alt="profil" />
          </div>
          <h1 className="profil-box-avatar-pseudo">{handle}</h1>
        </div>
        <div className="profil-box-infos">
          <h1 className="profil-box-infos-title">Infos</h1>
          <p className="profil-box-infos-prenom">{firstname}</p>
          <p className="profil-box-infos-nom">{lastname}</p>
          <p className="profil-box-infos-mail">{email}</p>
        </div>
        <div className="profil-box-skills">
          <h2 className="profil-box-skills-addict">Découvre ton taux d'addiction aux séries</h2>
          <Progress addiction={addiction} />
          <h2 className="profil-box-skills-avis">Avis {reviewNumber}</h2>
          <div className="profil-box-skills-avis-nbr">{reviewCount}</div>
        </div>
        <div className="profil-box-friends">
          <h1 className="profil-box-friends-title">Abonnements</h1>
          <div className="profil-box-friends-friend">
            <div className="profil-box-friends-friend-list">
              {relationships.map(({
                id: relationshipId,
                followedUser: {
                  handle: friendHandle,
                  picture: friendPicture,
                  slug: friendSlug,
                },
              }) => (
                <Link to={`/profil/${friendSlug}`} className="profil-friends-friend-list-link" key={relationshipId}>
                  <div className="profil-box-friends-friend-list-link-picture">
                    <img src={friendPicture} alt={friendHandle} />
                  </div>
                  <span className="profil-box-friends-friend-list-link-name">{friendHandle}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="profil-reviews">
        {reviews.slice().reverse().map((review) => {
          const {
            id,
            content,
            createdAt,
            show: {
              title,
            },
          } = review;
          return (
            <div key={id} className="profil-reviews-review">
              <p className="profil-reviews-review-com">
                <span className="profil-reviews-review-com-util">{handle}</span>
                <span> a posté le </span>
                <span className="profil-reviews-review-com-date">{formatDate(createdAt)}</span>
                <span> dans </span>
                {/* <Link to={`/${genreSlug}/${showSlug}`}> */}
                <span className="profil-reviews-review-com-show">{title}</span>
                {/* </Link> */}
              </p>
              <p className="profil-reviews-review-para">{content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Profile.propTypes = {
  ownProfile: PropTypes.shape({
    handle: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      show: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        genre: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  relationships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      followedUser: PropTypes.shape({
        handle: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  getMyProfile: PropTypes.func.isRequired,
  totalSeries: PropTypes.number.isRequired,
};

// == Export
export default Profile;
