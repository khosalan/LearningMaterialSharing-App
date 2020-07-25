import {SIGN_IN, SIGN_UP} from '../actions/auth';

const initialState = {
  userID: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      return {
        userID: action.userID,
        token: action.token,
      };

    default:
      return state;
  }
};
