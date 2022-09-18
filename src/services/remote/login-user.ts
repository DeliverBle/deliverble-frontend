import axios from 'axios';
import { LoginUserService } from '../api/login-user';

export function loginUserRemote(): LoginUserService {
  const requestLogin = async (code: string) => {
    try {
      const response = await axios.post(`http://3.36.120.112:8080/auth/kakao/login-or-signup?code=${code}`);
      return response.data.accessToken;
    } catch {
      throw '로그인 에러 발생';
    }
  };

  const getUserInfo = async (accessToken: string | null) => {
    try {
      const response = await axios.get('http://3.36.120.112:8080/user', {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      return {
        nickname: response.data.nickname,
        email: response.data.email,
      };
    } catch {
      throw '유저 데이터 요청 에러 발생';
    }
  };

  return { requestLogin, getUserInfo };
}
