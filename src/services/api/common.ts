import { UserData, LikeData } from '@src/types/common/remote';

export interface CommonService {
  requestLogin(code: string): Promise<string | undefined>;
  getUserInfo(): Promise<UserData>;
  postLikeData(newsId: number): Promise<LikeData>;
}
