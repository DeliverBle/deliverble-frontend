import { UserData, LikeData } from './types/common';

export interface CommonService {
  requestLogin(code: string): Promise<string | undefined>;
  getUserInfo(accessToken: string | null): Promise<UserData>;
  postLikeData(newsId: number): Promise<LikeData>;
}
