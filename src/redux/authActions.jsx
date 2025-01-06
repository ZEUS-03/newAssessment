import { LOGIN, LOGOUT, SIGNUP, UPDATE } from "./actions";
import axios from "axios";

export const signupAction = (userData) => {
  return async (dispatch) => {
    const response = await axios.post(
      "https://testasdate.free.beeceptor.com/api/users",
      userData
    );
    if (response.status === 200) {
      dispatch({
        type: SIGNUP,
        payload: response.data,
      });
    }
  };
};

export const loginAction = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };
};

export const updateUserAction = (userData, userID) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `https://testasdate.free.beeceptor.com/api/users/${userID}`,
      userData
    );
    if (response.status === 200) {
      dispatch({
        type: UPDATE,
        payload: response.data,
      });
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
