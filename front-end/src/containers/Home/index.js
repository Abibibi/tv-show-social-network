// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Home from 'src/components/Home';
import {
  getHomeReviews,
  getHomeShows,
  changeShowValue,
  changeReview,
  postReview,
} from 'src/store/reducer/review';

// Action Creators

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  allReviews: state.review.allReviews,
  allShows: state.review.allShows,
  reviewShow: state.review.reviewShow,
  reviewContent: state.review.reviewContent,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  getReviews: () => {
    const action = getHomeReviews();
    dispatch(action);
  },
  getShows: () => {
    const action = getHomeShows();
    dispatch(action);
  },
  changeShowInput: (value) => {
    const action = changeShowValue(value);
    dispatch(action);
  },
  changeReviewInput: (value) => {
    const action = changeReview(value);
    dispatch(action);
  },
  submitReview: () => {
    const action = postReview();
    dispatch(action);
  },
});

// Container
const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

// == Export
export default HomeContainer;
