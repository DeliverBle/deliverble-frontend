// import { LikeListData } from './types/like';

// export interface LikeService {
//   getLikeData(): Promise<LikeListData>;
// }

import { LikeData } from './types/like';

export interface LikeService {
  getLikeData(): Promise<LikeData[]>;
}
