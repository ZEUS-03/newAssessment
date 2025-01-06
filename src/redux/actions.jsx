export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const UPDATE = "UPDATE";

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const signup = (userData) => ({
  type: SIGNUP,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});

export const update = () => ({
  type: UPDATE,
});
