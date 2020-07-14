export const CREATE_POST = 'CREATE_POST';

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
