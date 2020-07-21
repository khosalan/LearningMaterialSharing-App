import POSTS from '../../data/dummy-data';

import {CREATE_POST, TOGGLE_FAVOURITE, SET_POSTS} from '../actions/post';
import Post from '../../models/post';

const initialState = {
  allPosts: POSTS,
  favouritePosts: [],
  myPosts: POSTS.filter(post => post.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        allPosts: action.posts,
      };

    case CREATE_POST:
      const newPost = new Post(
        action.postData.id,
        'u1',
        'Khosalan Ganesan',
        action.postData.createdAt,
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
