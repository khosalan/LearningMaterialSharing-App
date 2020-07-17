import POSTS from '../../data/dummy-data';

import {CREATE_POST, TOGGLE_FAVOURITE} from '../actions/post';
import Post from '../../models/post';

const initialState = {
  allPosts: POSTS,
  favouritePosts: [],
  myPosts: POSTS.filter(post => post.ownerId === 'u1'),
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

      return {
        ...state,
        allPosts: state.allPosts.concat(newPost),
      };

    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouritePosts.findIndex(
        post => post.id === action.postID,
      );

      if (existingIndex >= 0) {
        const updateFavPost = [...state.favouritePosts];
        updateFavPost.splice(existingIndex, 1);
        return {...state, favouritePosts: updateFavPost};
      } else {
        const post = state.allPosts.find(post => post.id === action.postID);
        return {...state, favouritePosts: state.favouritePosts.concat(post)};
      }

    default:
      return state;
  }
};
