import {AUTHENTICATE, TRY_AUTO_LOGIN} from '../actions/auth';

const initialState = {
  userID: null,
  token: null,
  tryAutoLogin: false,
  firstName: '',
  lastName: '',
  regNo: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userID: action.userID,
        token: action.token,
        firstName: action.firstName,
        lastName: action.lastName,
        regNo: action.regNo,
        email: action.email,
        tryAutoLogin: true,
      };

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        tryAutoLogin: true,
      };

    default:
      return state;
  }
};
