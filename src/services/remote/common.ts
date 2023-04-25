import { CommonService } from '@src/services/api/common';
import axios from 'axios';
import { API } from './base';

export function commonDataRemote(): CommonService {
  const requestLogin = async (code: string) => {
    try {
      const response = await axios.post(`https://deliverble.online/auth/authentication/kakao?code=${code}`);
      return response.data.data.accessToken;
    } catch {
      throw '로그인 에러 발생';
    }
  };

  const getUserInfo = async (accessToken: string | null) => {
    try {
      const response = await axios.get('https://deliverble.online/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return {
        nickname: response.data.data.nickname,
        email: response.data.data.email,
      };
    } catch {
      throw '유저 데이터 요청 에러 발생';
    }
  };

  const postLikeData = async (newsId: number) => {
    const response = await API.post({ url: `/user/favorite/${newsId}` });
    return response.data;
  };

  return { requestLogin, getUserInfo, postLikeData };
}
