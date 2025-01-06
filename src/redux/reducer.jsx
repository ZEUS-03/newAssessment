const initialState = { user: null, isLoggedIn: false };
import { LOGIN, LOGOUT, SIGNUP, UPDATE } from "./actions";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case UPDATE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export default authReducer;
