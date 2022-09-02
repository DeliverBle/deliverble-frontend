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

  //임시 목 데이터
  const getUserInfo = async () => {
    return USER_DATA;
  };

  return { requestLogin, getUserInfo };
}
