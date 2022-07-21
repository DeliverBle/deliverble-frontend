import { responseEncoding } from 'axios';
import { publicAPI } from '../remote/base';
import { LoginUser, PostLoginRequestBody } from './types/user';
export interface LoginUserService {
  requestAccessToken(): Promise<LoginUser>;
}

export const getAccessTokenAndId = async (code: string): Promise<LoginUser> => {
  try {
    const response = await publicAPI.get({ url: `/auth/kakao/token?code=${code}` });
    if (response.status === 200) return response.message;
    else throw '실패';
  } catch (error) {
    console.error(error);
    throw '실패';
  }
};

export const postLogin = async (body: PostLoginRequestBody) => {
  try {
    const response = await publicAPI.post({
      url: `/auth/login`,
      data: body,
    });
    if (response.status === 200) return response.message.user;
    else throw '로그인 실패';
  } catch (error) {
    console.error(error);
    throw '로그인 실패';
  }
};
