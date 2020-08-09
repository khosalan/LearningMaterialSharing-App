import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Post from '../../models/post';

export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_POSTS = 'SET_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const MY_POSTS = 'MY_POSTS';
export const FAVOURITE_POST = 'FAVOURITE_POST';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const SET_MORE_POSTS = 'SET_MORE_POSTS';

const query = firestore()
  .collection('Posts')
  .orderBy('createdAt', 'desc')
  .limit(5);

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const response = await query.get();
      let lastQuery;

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
            '',
            documentSnapshot.data().avatar,
            documentSnapshot.data().document,
          ),
        );
        lastQuery = documentSnapshot;
      });

      dispatch({
        type: SET_POSTS,
        posts: loadedPosts,
        lastQuery,
      });
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };
};

export const fetchMore = () => {
  return async (dispatch, getState) => {
    const alreadyLoadedPosts = getState().posts.allPosts;
    const lastQuery = getState().posts.lastQuery;
    let newLastQuery;
    try {
      const response = await query.startAfter(lastQuery).get();

      const loadedPosts = alreadyLoadedPosts;

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
            '',
            documentSnapshot.data().avatar,
            documentSnapshot.data().document,
          ),
        );

        newLastQuery = documentSnapshot;
      });

      dispatch({
        type: SET_MORE_POSTS,
        posts: loadedPosts,
        newLastQuery,
      });
    } catch (e) {
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
            '',
            documentSnapshot.data().avatar,
            documentSnapshot.data().document,
          ),
        ),
      );

      dispatch({
        type: MY_POSTS,
        myPosts: loadedPosts,
      });
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };
};

export const createPost = (title, description, imageUrl, links, filePath) => {
  return async (dispatch, getState) => {
    const owner = getState().auth.userID;
    const ownerName =
      getState().auth.firstName + ' ' + getState().auth.lastName;
    const avatar = getState().auth.profilePic;
    let url = '';

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
          avatar: avatar ? avatar : null,
        });
      const resData = await response.get();

      if (filePath) {
        const reference = storage().ref(`posts/${resData.id}`);
        await reference.putFile(filePath);

        url = await storage()
          .ref(`posts/${resData.id}`)
          .getDownloadURL();
      }

      await firestore()
        .collection('Posts')
        .doc(resData.id)
        .update({document: url});

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
          avatar: avatar ? avatar : null,
          document: url,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const updatePost = (id, title, description, imageUrl, links) => {
  return async dispatch => {
    try {
      await firestore()
        .collection('Posts')
        .doc(id)
        .update({
          title,
          description,
          imageUrl,
          links,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

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
      throw new Error(e);
    }
  };
};

export const deletePost = postID => {
  return async dispatch => {
    try {
      await firestore()
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
        avatar: post.avatar,
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
      throw new Error('Something went wrong');
    }
  };
};
