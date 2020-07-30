import firestore from '@react-native-firebase/firestore';
import Post from '../../models/post';

export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_POSTS = 'SET_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const MY_POSTS = 'MY_POSTS';
export const FAVOURITE_POST = 'FAVOURITE_POST';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const response = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .get();

      const loadedPosts = [];

      response.forEach(documentSnapshot => {
        loadedPosts.push(
          new Post(
            documentSnapshot.id,
            documentSnapshot.data().owner,
            documentSnapshot.data().ownerName,
            documentSnapshot.data().createdAt._seconds,
            documentSnapshot.data().title,
            documentSnapshot.data().imageUrl,
            documentSnapshot.data().description,
            documentSnapshot.data().links,
          ),
        );
      });

      dispatch({
        type: SET_POSTS,
        posts: loadedPosts,
      });
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  };
};

export const fetchMyPosts = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.userID;
    try {
      const response = await firestore()
        .collection('Posts')
        .where('owner', '==', userID)
        .get();

      const loadedPosts = [];

      response.forEach(documentSnapshot =>
        loadedPosts.push(
          new Post(
            documentSnapshot.id,
            userID,
            documentSnapshot.data().ownerName,
            documentSnapshot.data().createdAt._seconds,
            documentSnapshot.data().title,
            documentSnapshot.data().imageUrl,
            documentSnapshot.data().description,
            documentSnapshot.data().links,
          ),
        ),
      );

      dispatch({
        type: MY_POSTS,
        myPosts: loadedPosts,
      });
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  };
};

export const createPost = (title, description, imageUrl, links) => {
  return async (dispatch, getState) => {
    const owner = getState().auth.userID;
    const ownerName =
      getState().auth.firstName + ' ' + getState().auth.lastName;

    try {
      const response = await firestore()
        .collection('Posts')
        .add({
          title,
          description,
          imageUrl,
          links,
          createdAt: firestore.FieldValue.serverTimestamp(),
          owner,
          ownerName,
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
          owner,
          ownerName,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

export const updatePost = (id, title, description, imageUrl, links) => {
  return async dispatch => {
    console.log(links);
    try {
      const response = await firestore()
        .collection('Posts')
        .doc(id)
        .update({
          title,
          description,
          imageUrl,
          links,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      // const resData = await response.get();

      dispatch({
        type: UPDATE_POST,
        postData: {
          id,
          title,
          description,
          imageUrl,
          links,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

export const deletePost = postID => {
  return async dispatch => {
    try {
      const response = await firestore()
        .collection('Posts')
        .doc(postID)
        .delete();

      dispatch({type: DELETE_POST, postID});
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };
};

export const toggleFavourite = postID => {
  return async (dispatch, getState) => {
    const user = getState().auth.userID;
    const post = getState().posts.allPosts.find(post => post.id === postID);

    const query = firestore()
      .collection('Users')
      .doc(user)
      .collection('Favourites')
      .doc(postID);

    const snapshot = await query.get();

    if (!snapshot.exists) {
      await query.set({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        links: post.links,
        owner: post.owner,
        ownerName: post.ownerName,
        time: post.time,
      });
    } else {
      await query.delete();
    }

    dispatch({type: TOGGLE_FAVOURITE, postID});
  };
};

export const fetchFavourites = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.userID;
    try {
      const response = await firestore()
        .collection('Users')
        .doc(userID)
        .collection('Favourites')
        .get();

      const loadedPosts = [];

      response.forEach(documentSnapshot =>
        loadedPosts.push(
          new Post(
            documentSnapshot.id,
            documentSnapshot.data().owner,
            documentSnapshot.data().ownerName,
            documentSnapshot.data().time,
            documentSnapshot.data().title,
            documentSnapshot.data().imageUrl,
            documentSnapshot.data().description,
            documentSnapshot.data().links,
          ),
        ),
      );

      dispatch({
        type: FAVOURITE_POST,
        favouritePosts: loadedPosts,
      });
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  };
};
