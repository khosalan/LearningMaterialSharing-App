import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';

export const signUp = (firstName, lastName, regNo, email, password) => {
  return async dispatch => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const id = await auth().currentUser.getIdToken();

      const user = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          regNo,
          email,
        });

      dispatch({type: SIGN_UP});
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        throw new Error(
          'The email address is already in use by another account',
        );
      }

      if (e.code === 'auth/network-request-failed') {
        throw new Error('Please check your connection');
      }
      throw e;
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      const id = await auth().currentUser.getIdToken();
      console.log(response, id);

      dispatch({type: SIGN_IN});
    } catch (e) {
      if (
        e.code === 'auth/user-not-found' ||
        e.code === 'auth/wrong-password'
      ) {
        throw new Error('Incorrect email address or password');
      }

      if (e.code === 'auth/network-request-failed') {
        throw new Error('Please check your connection');
      }
      throw e;
    }
  };
};
