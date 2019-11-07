// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Opinion from 'src/components/Opinion';

// Action Creators
import { postReview, changeReviewOnShowPage } from 'src/store/reducer/review';
/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */

/* Je vais chercher dans le state du reducer serie puis je prends les donnés donc serie.title */
const mapStateToProps = (state) => ({
  reviews: state.serie.reviews,
  reviewContent: state.review.reviewContent,
  reviewContentShowPage: state.review.reviewContentShowPage,
  showId: state.serie.oneSerie.slug,
  showTitle: state.serie.oneSerie.title,
});


/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  changeReviewInput: (id, value) => {
    const action = changeReviewOnShowPage(id, value);
    dispatch(action);
  },

  submitReview: () => {
    const action = postReview();
    dispatch(action);
  },
});

// Container
const OpinionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Opinion);

// == Export
export default OpinionContainer;
