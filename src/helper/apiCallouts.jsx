import axios from "axios";

export async function getUsers() {
  return await axios.get("https://testasdate.free.beeceptor.com/api/users");
}

export async function validateUser(userData) {
  const { data: users } = await getUsers();
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

export async function generateAvatar(fname, lname) {
  const url = `https://ui-avatars.com/api/?name=${fname}+${lname}`;
  const imageData = await axios.get(url);
  return imageData;
}
