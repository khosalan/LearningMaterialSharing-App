import POSTS from '../../data/dummy-data';

import {
  CREATE_POST,
  TOGGLE_FAVOURITE,
  SET_POSTS,
  DELETE_POST,
} from '../actions/post';
import Post from '../../models/post';

const initialState = {
  allPosts: [],
  favouritePosts: [],
  myPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        allPosts: action.posts,
        myPosts: action.posts.filter(post => post.ownerId === 'u1'),
      };

    case CREATE_POST:
      const newPost = new Post(
        action.postData.id,
        'u1',
        'Khosalan',
        action.postData.createdAt,
        action.postData.title,
        action.postData.imageUrl,
        action.postData.description,
        action.postData.links,
      );

      return {
        ...state,
        allPosts: state.allPosts.concat(newPost),
        myPosts: state.myPosts.concat(newPost),
      };

    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.postID),
        myPosts: state.myPosts.filter(post => post.id !== action.postID),
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
