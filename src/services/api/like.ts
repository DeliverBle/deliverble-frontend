import { LikeListData } from './types/like';

export interface LikeService {
  getLikeData(): Promise<LikeListData>;
}

// 목 데이터
// import { LikeData } from './types/like';

// export interface LikeService {
//   getLikeData(): Promise<LikeData[]>;
// }
