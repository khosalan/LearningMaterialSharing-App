import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AUTHENTICATE = 'AUTHENTICATE';
export const TRY_AUTO_LOGIN = 'TRY_AUTO_LOGIN';
export const LOG_OUT = 'LOG_OUT';

export const tryAutoLogin = () => {
  return {type: TRY_AUTO_LOGIN};
};

export const authenticate = (
  userID,
  token,
  firstName,
  lastName,
  regNo,
  email,
) => {
  return {type: AUTHENTICATE, userID, token, firstName, lastName, regNo, email};
};

export const signUp = (firstName, lastName, regNo, email, password) => {
  return async dispatch => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      const token = await auth().currentUser.getIdToken();
      const userID = auth().currentUser.uid;

      await firestore()
        .collection('Users')
        .doc(userID)
        .set({
          firstName,
          lastName,
          regNo,
          email,
        });

      dispatch(authenticate(userID, token, firstName, lastName, regNo, email));
      saveDataToStorage(token, userID, firstName, lastName, regNo, email);
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
      await auth().signInWithEmailAndPassword(email, password);

      const token = await auth().currentUser.getIdToken();
      const userID = auth().currentUser.uid;

      const user = await firestore()
        .collection('Users')
        .doc(userID)
        .get();

      dispatch(
        authenticate(
          userID,
          token,
          user.data().firstName,
          user.data().lastName,
          user.data().regNo,
          email,
        ),
      );
      saveDataToStorage(
        token,
        userID,
        user.data().firstName,
        user.data().lastName,
        user.data().regNo,
        email,
      );
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

export const logout = () => {
  return async dispatch => {
    await auth().signOut();
    AsyncStorage.removeItem('userData');
    dispatch({type: LOG_OUT});
  };
};

const saveDataToStorage = (
  token,
  userID,
  firstName,
  lastName,
  regNo,
  email,
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({token, userID, firstName, lastName, regNo, email}),
  );
};
