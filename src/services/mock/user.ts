import { LoginUserService } from '../api/login-user';
import { USER_DATA, USER_DATA_TOKEN } from './user.data';

export function loginUserDataMock(): LoginUserService {
  const requestLogin = async (code: string) => {
    if ((code = '1234567890abcdefghijkThisIsCode')) {
      return USER_DATA_TOKEN;
    }
  };

  const getUserInfo = async () => {
    return USER_DATA;
  };

  return { requestLogin, getUserInfo };
}
