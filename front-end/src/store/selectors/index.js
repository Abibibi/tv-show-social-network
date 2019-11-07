/* eslint-disable import/prefer-default-export */

// on crée une fonction utilitaire réutilisable pour voir si on est l'auteur
export const isMe = (messageUserId, sessionUserId) => messageUserId === sessionUserId;

export const formatDate = (reviewDate) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const timestamp = Date.parse(reviewDate);
  const timestampToDate = new Date(timestamp);
  const reviewDateFormated = timestampToDate.toLocaleDateString('fr-FR', options);
  return reviewDateFormated;
};
