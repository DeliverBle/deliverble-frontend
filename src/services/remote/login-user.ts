import { LoginUserService } from '../api/login-user';
import { publicAPI } from './base';

export function loginUserRemote(): LoginUserService {
  // accessToken 서버에서 받아오기.
  const requestAccessToken = async () => {
    const response = await publicAPI.get({ url: '/auth/kakao' });
    if (response.status === 200) {
      console.log(response);
      return {
        accessToken: response.message.accessToken,
        userId: response.message.userId,
      };
    } else throw '엑세스 토큰 요청 실패';
  };

  return { requestAccessToken };
}
