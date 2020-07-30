import {SET_COMMENTS} from '../actions/comment';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        comments: action.comments,
      };

    default:
      return state;
  }
};
