import { CommonService } from '@src/services/api/common';
import { LIKE_DATA, USER_DATA, USER_DATA_TOKEN } from './common.data';

export function loginUserDataMock(): CommonService {
  const requestLogin = async () => {
    await wait(500);
    return USER_DATA_TOKEN.accessToken;
  };

  const getUserInfo = async () => {
    return USER_DATA;
  };

  const postLikeData = async () => {
    return LIKE_DATA;
  };

  return { requestLogin, getUserInfo, postLikeData };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
