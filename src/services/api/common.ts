import { UserData, LikeData } from '@src/types/common/remote';

export interface CommonService {
  requestLogin(code: string): Promise<string | undefined>;
  getUserInfo(accessToken: string | null): Promise<UserData>;
  postLikeData(newsId: number): Promise<LikeData>;
}
