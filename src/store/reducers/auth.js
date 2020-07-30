import {
  AUTHENTICATE,
  TRY_AUTO_LOGIN,
  LOG_OUT,
  UPLOAD_PROFILE_PIC,
  DELETE_PROFILE_PIC,
} from '../actions/auth';

const initialState = {
  userID: null,
  token: null,
  tryAutoLogin: false,
  firstName: '',
  lastName: '',
  email: '',
  regNo: '',
  profilePic: '',
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
        profilePic: action.profilePic,
      };

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        tryAutoLogin: true,
      };

    case LOG_OUT:
      return {
        ...initialState,
        tryAutoLogin: true,
      };

    case UPLOAD_PROFILE_PIC:
      return {
        ...state,
        profilePic: action.profilePic,
      };

    case DELETE_PROFILE_PIC:
      return {
        ...state,
        profilePic: '',
      };

    default:
      return state;
  }
};
