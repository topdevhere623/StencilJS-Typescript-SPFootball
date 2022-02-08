import { getFromStorage, ProfileService, setToStorage, User, UserService, userState } from 'ftb-models';

export async function updateUserFromServer() {
  await new ProfileService().loadProfileInfo().then(async user => {
    for (const key in user) {
      if (JSON.stringify(userState[key]) != JSON.stringify(user[key])) {
        userState[key] = user[key];
      }
    }
    return saveUserInLS();
  });
}

export async function editUserOnServer(newPhoto?: string) {
  await new UserService().editProfile(userState, newPhoto);
  return saveUserInLS();
}

export async function saveUserInLS() {
  return await setToStorage('afl-mob::user', Object.assign(new User(), userState));
}

export async function getUserFromLS() {
  const user = await getFromStorage('afl-mob::user');
  return user;
}
