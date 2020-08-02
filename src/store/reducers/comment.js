import Comment from '../../models/comment';

import {SET_COMMENTS, CREATE_COMMENT} from '../actions/comment';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        comments: action.comments,
      };

    case CREATE_COMMENT:
      const newComment = new Comment(
        action.commentData.id,
        action.commentData.owner,
        action.commentData.ownerName,
        action.commentData.createdAt,
        action.commentData.comment,
        action.commentData.avatar,
      );

      return {
        ...state,
        comments: state.comments.concat(newComment),
      };

    default:
      return state;
  }
};
