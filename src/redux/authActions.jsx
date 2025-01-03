import { LOGIN, LOGOUT, SIGNUP } from "./actions";
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
