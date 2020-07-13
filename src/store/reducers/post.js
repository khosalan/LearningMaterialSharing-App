import POSTS from '../../data/dummy-data';

const initialState = {
  allPosts: POSTS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
