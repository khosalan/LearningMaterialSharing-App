import AsyncStorage from '@react-native-community/async-storage';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const TRY_AUTO_LOGIN = 'TRY_AUTO_LOGIN';
export const LOG_OUT = 'LOG_OUT';
export const UPLOAD_PROFILE_PIC = 'UPLOAD_PROFILE_PIC';
export const DELETE_PROFILE_PIC = 'DELETE_PROFILE_PIC';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const tryAutoLogin = () => {
  return {type: TRY_AUTO_LOGIN};
};

export const authenticate = (userID, token, firstName, lastName, regNo) => {
  return async dispatch => {
    try {
      const email = auth().currentUser.email;
      let url;
      try {
        url = await storage()
          .ref(`profile_pictures/${auth().currentUser.uid}`)
          .getDownloadURL();
      } catch (e) {
        url = null;
      }
      dispatch({
        type: AUTHENTICATE,
        userID,
        token,
        firstName,
        lastName,
        regNo,
        email,
        profilePic: url,
      });
    } catch (e) {
      console.log(e);
      AsyncStorage.removeItem('userData');
      dispatch({type: TRY_AUTO_LOGIN});
    }
  };
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

      dispatch(authenticate(userID, token, firstName, lastName, regNo));
      saveDataToStorage(token, userID, firstName, lastName, regNo);
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
        ),
      );
      saveDataToStorage(
        token,
        userID,
        user.data().firstName,
        user.data().lastName,
        user.data().regNo,
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

export const deleteAccount = password => {
  return async dispatch => {
    try {
      const user = auth().currentUser;

      await auth().signInWithEmailAndPassword(user.email, password);

      await user.delete();
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .delete();

      const posts = await firestore()
        .collection('Posts')
        .where('owner', '==', user.uid)
        .get();

      const batch = firestore().batch();

      posts.forEach(documentSnapShot => {
        batch.delete(documentSnapShot.ref);
      });

      batch.commit();
      AsyncStorage.removeItem('userData');

      dispatch({type: DELETE_ACCOUNT});
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/wrong-password') {
        throw new Error(
          'Incorrect password. Please enter your password correctly',
        );
      }

      if (e.code === 'auth/too-many-requests') {
        throw new Error(
          'Too many attempts. Your account has been blocked temporerly. Please try again later',
        );
      }
      throw e;
    }
  };
};

export const uploadProfilePicture = filepath => {
  return async dispatch => {
    const reference = storage().ref(
      `profile_pictures/${auth().currentUser.uid}`,
    );
    await reference.putFile(filepath);

    const url = await storage()
      .ref(`profile_pictures/${auth().currentUser.uid}`)
      .getDownloadURL();

    dispatch({type: UPLOAD_PROFILE_PIC, profilePic: url});
  };
};

export const deleteProfilePicture = () => {
  return async dispatch => {
    try {
      const reference = storage().ref(
        `profile_pictures/${auth().currentUser.uid}`,
      );

      await reference.delete();
      dispatch({type: DELETE_PROFILE_PIC});
    } catch (e) {
      if (e.code === 'storage/object-not-found')
        throw new Error('Invalid operation');
      throw new Error('Something went wrong');
    }
  };
};

const saveDataToStorage = (token, userID, firstName, lastName, regNo) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({token, userID, firstName, lastName, regNo}),
  );
};
