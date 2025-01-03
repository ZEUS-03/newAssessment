import axios from "axios";

export async function getUsers() {
  return await axios.get("https://testasdate.free.beeceptor.com/api/users");
}

export function validateUser(userData) {
  const users = getUsers();
  const user = users.find((user) => user.email === userData.email);
  if (user) {
    if (user.password === userData.password) {
      return user;
    } else {
      return false;
    }
  }
  return false;
}
