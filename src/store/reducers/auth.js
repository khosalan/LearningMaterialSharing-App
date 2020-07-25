import {SIGN_IN, SIGN_UP} from '../actions/auth';

const initialState = {
  userID: null,
  token: null,
  firstName: '',
  lastName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      return {
        userID: action.userID,
        token: action.token,
        firstName: action.firstName,
        lastName: action.lastName,
      };

    default:
      return state;
  }
};
