import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';

export const signUp = (firstName, lastName, regNo, email, password) => {
  return async dispatch => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          regNo,
          email,
        });

      console.log(user);

      dispatch({type: SIGN_UP});
    } catch (e) {
      throw e;
    }
  };
};
