import firestore from '@react-native-firebase/firestore';
import Post from '../../models/post';

export const CREATE_POST = 'CREATE_POST';
export const SET_POSTS = 'SET_POSTS';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const fetchPosts = () => {
  return async dispatch => {
    const response = await firestore()
      .collection('Posts')
      .get();

    const loadedPosts = [];

    response.forEach(documentSnapshot =>
      loadedPosts.push(
        new Post(
          documentSnapshot.id,
          'u1',
          'Khosalan',
          documentSnapshot.data().createdAt._seconds,
          documentSnapshot.data().title,
          documentSnapshot.data().imageUrl,
          documentSnapshot.data().description,
          documentSnapshot.data().links,
        ),
      ),
    );

    dispatch({type: SET_POSTS, posts: loadedPosts});
  };
};

export const createPost = (title, description, imageUrl, links) => {
  return async dispatch => {
    try {
      const response = await firestore()
        .collection('Posts')
        .add({
          title,
          description,
          imageUrl,
          links,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      const resData = await response.get();

      dispatch({
        type: CREATE_POST,
        postData: {
          id: resData.id,
          title,
          description,
          imageUrl,
          links,
          createdAt: resData.data().createdAt._seconds,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

export const toggleFavourite = postID => {
  return {type: TOGGLE_FAVOURITE, postID};
};
