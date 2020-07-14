import POSTS from '../../data/dummy-data';

import {CREATE_POST} from '../actions/post';
import Post from '../../models/post';

const initialState = {
  allPosts: POSTS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      const newPost = new Post(
        new Date().toISOString(),
        'u1',
        'Khosalan Ganesan',
        '1h ago',
        action.postData.title,
        action.postData.imageUrl,
        action.postData.description,
        action.postData.links,
      );

      console.log(newPost);

      return {
        ...state,
        allPosts: state.allPosts.concat(newPost),
      };

    default:
      return state;
  }
};
