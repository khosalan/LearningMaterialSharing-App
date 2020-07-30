import firestore from '@react-native-firebase/firestore';

import Comment from '../../models/comment';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const SET_COMMENTS = 'SET_COMMENTS';

export const addComments = (postID, comment) => {
  return async (dispatch, getState) => {
    const owner = getState().auth.userID;
    const ownerName =
      getState().auth.firstName + ' ' + getState().auth.lastName;

    try {
      const response = await firestore()
        .collection('Posts')
        .doc(postID)
        .collection('Comments')
        .add({
          comment,
          createdAt: firestore.FieldValue.serverTimestamp(),
          owner,
          ownerName,
        });
      const resData = await response.get();

      // dispatch({
      //   type: CREATE_COMMENT,
      //   commentData: {
      //     id: resData.id,
      //     comment,
      //     createdAt: resData.data().createdAt._seconds,
      //     owner,
      //     ownerName,
      //   },
      // });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};

export const fetchComments = postID => {
  return async dispatch => {
    try {
      const response = await firestore()
        .collection('Posts')
        .doc(postID)
        .collection('Comments')
        .orderBy('createdAt', 'desc')
        .get();

      const loadedComments = [];

      response.forEach(documentSnapshot => {
        loadedComments.push(
          new Comment(
            documentSnapshot.id,
            documentSnapshot.data().owner,
            documentSnapshot.data().ownerName,
            documentSnapshot.data().createdAt._seconds,
            documentSnapshot.data().comment,
          ),
        );
      });

      dispatch({
        type: SET_COMMENTS,
        comments: loadedComments,
      });
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong');
    }
  };
};
