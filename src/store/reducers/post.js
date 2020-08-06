import POSTS from '../../data/dummy-data';

import {
  CREATE_POST,
  TOGGLE_FAVOURITE,
  SET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  MY_POSTS,
  FAVOURITE_POST,
  SET_MORE_POSTS,
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
        lastQuery: action.lastQuery,
      };

    case SET_MORE_POSTS:
      return {
        ...state,
        allPosts: action.posts,
        lastQuery: action.newLastQuery,
      };

    case MY_POSTS:
      return {
        ...state,
        myPosts: action.myPosts,
      };

    case FAVOURITE_POST:
      return {
        ...state,
        favouritePosts: action.favouritePosts,
      };

    case CREATE_POST:
      const newPost = new Post(
        action.postData.id,
        action.postData.owner,
        action.postData.ownerName,
        action.postData.createdAt,
        action.postData.title,
        action.postData.imageUrl,
        action.postData.description,
        action.postData.links,
        '',
        action.postData.avatar,
        action.postData.document,
      );

      return {
        ...state,
        allPosts: state.allPosts.concat(newPost),
        myPosts: state.myPosts.concat(newPost),
      };

    case UPDATE_POST:
      const postID = state.allPosts.findIndex(
        post => post.id === action.postData.id,
      );

      const myPostID = state.myPosts.findIndex(
        post => post.id === action.postData.id,
      );

      const updatedPost = new Post(
        action.postData.id,
        state.myPosts[myPostID].ownerId,
        state.myPosts[myPostID].ownerName,
        state.myPosts[myPostID].time,
        action.postData.title,
        action.postData.imageUrl,
        action.postData.description,
        action.postData.links,
        state.myPosts[myPostID].avatar,
      );

      const updateMyPosts = [...state.myPosts];
      updateMyPosts[myPostID] = updatedPost;

      const updateAllPosts = [...state.allPosts];
      updateAllPosts[postID] = updatedPost;

      return {
        ...state,
        allPosts: updateAllPosts,
        myPosts: updateMyPosts,
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
