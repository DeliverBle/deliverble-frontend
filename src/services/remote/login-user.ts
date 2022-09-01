import axios from 'axios';
import { LoginUserService } from '../api/login-user';
import { USER_DATA } from '../mock/user.data';

export function loginUserRemote(): LoginUserService {
  const requestLogin = async (code: string) => {
    try {
      const response = await axios.post(`http://3.36.120.112:8080/auth/kakao/login-or-signup?code=${code}`);
      return {
        accessToken: response.data,
      };
    } catch {
      throw '로그인 에러 발생';
    }
  };

  const getUserInfo = async () => {
    return USER_DATA;
  };

  // const requestLogin = (code: string) => {
  //   return {
  //     accessToken: '12313213',
  //   };
  // };

  return { requestLogin, getUserInfo };
}
