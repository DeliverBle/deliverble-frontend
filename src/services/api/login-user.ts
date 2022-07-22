import { publicAPI } from '../remote/base';
import { JoinAndLoginRequestBody, TokenAndUserInfo } from './types/user';
export interface LoginUserService {
  requestAccessToken(): Promise<TokenAndUserInfo>;
}

export const getAccessTokenAndId = async (code: string): Promise<TokenAndUserInfo> => {
  try {
    const response = await publicAPI.get({ url: `/auth/kakao/token?code=${code}` });
    if (response.status === 200) return response.message;
    else throw '실패';
  } catch (error) {
    console.error(error);
    throw '실패';
  }
};

export const postJoin = async (body: JoinAndLoginRequestBody) => {
  try {
    const response = await publicAPI.post({
      url: `/auth/signup`,
      data: body,
    });
    return response;
  } catch (e) {
    throw '회원가입 실패';
  }
};

export const postLogin = async (body: JoinAndLoginRequestBody) => {
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
