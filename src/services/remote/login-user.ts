import axios from 'axios';
import { LoginUserService } from '../api/login-user';

export function loginUserRemote(): LoginUserService {
  const requestLogin = async (code: string) => {
    try {
      const response = await axios.post(`http://13.209.32.166:8081/auth/authentication/kakao?code=${code}`);
      return response.data.data.accessToken;
    } catch {
      throw '로그인 에러 발생';
    }
  };

  const getUserInfo = async (accessToken: string | null) => {
    try {
      const response = await axios.get('https://deliverble.online/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        nickname: response.data.data.nickname,
        email: response.data.data.email,
      };
    } catch {
      throw '유저 데이터 요청 에러 발생';
    }
  };

  return { requestLogin, getUserInfo };
}
