export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
export const validatePassword = (password) => {
  if (password.length < 8) {
    return false;
  }
  return true;
};
