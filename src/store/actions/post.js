export const CREATE_POST = 'CREATE_POST';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const createPost = (title, description, imageUrl, links) => {
  return {
    type: CREATE_POST,
    postData: {
      title,
      description,
      imageUrl,
      links,
    },
  };
};

export const toggleFavourite = postID => {
  return {type: TOGGLE_FAVOURITE, postID};
};
