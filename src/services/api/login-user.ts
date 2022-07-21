// import { LoginUser } from './types/user';
// import { publicAPI } from '../remote/base';

// export interface LoginUserService {
//     getUserInfo(token: string): Promise<LoginUser>;
// }

// //회원가입 요청 보내기.
// export const postSignup = async (access_token: string, user_id: string,) => {
//     try {
//         const response = await publicAPI.post({
//             url: `/auth/signup`,
//             // data: { 받아온 accessToken과 userId }
//         });
//         return response;
//     } catch(e) {
//         throw '회원가입 실패';
//     }
// }

// //로그인 요청 보내기
// export const postLogin = async (
//     access_token: string, user_id: string,
// ): Promise<{ user?: string; accessToken: string; refreshToken?: string}>
//     try {
//         const response = await publicAPI.post({
//             url: `/auth/login`,
//             // data: { 받아온 accessToken과 userId }
//         });
//         if (response.status === 200) return response.data;
//         else throw '로그인 실패'
//     } catch (error) {
//         console.error(error);
//         throw '로그인 실패'
//     }
// };

import { publicAPI } from '../remote/base';
import { LoginUser } from './types/user';
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
