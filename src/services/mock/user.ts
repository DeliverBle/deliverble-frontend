import { LoginUserService } from '../api/login-user';
import { USER_DATA, USER_DATA_TOKEN } from './user.data';

export function loginUserDataMock(): LoginUserService {
  const requestLogin = async () => {
    await wait(500);
    return USER_DATA_TOKEN.accessToken;
  };

  const getUserInfo = async () => {
    return USER_DATA;
  };

  return { requestLogin, getUserInfo };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
