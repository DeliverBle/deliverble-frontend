import { BASE_URL } from '@src/constants/common';
import { CommonService } from '@src/services/api/common';
import axios from 'axios';
import { API } from './base';

export function commonDataRemote(): CommonService {
  const requestLogin = async (code: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/authentication/kakao?code=${code}`);
      return response.data.data.accessToken;
    } catch {
      throw '로그인 에러 발생';
    }
  };

  const getUserInfo = async () => {
    const response = await API.get({ url: `/user` });
    const { nickname, email } = response.data;
    return { nickname, email };
  };

  const postLikeData = async (newsId: number) => {
    const response = await API.post({ url: `/user/favorite/${newsId}` });
    return response.data;
  };

  return { requestLogin, getUserInfo, postLikeData };
}
