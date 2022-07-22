import { LikeData } from './../api/types/like';
import { LikeService } from './../api/like';
import { privateAPI } from './base';

export function likeDataRemote(): LikeService {
  const getLikeData = async () => {
    const response = await privateAPI.get({ url: `/user/favorite/all` });
    if (response.status === 200) {
      console.log(response);
      return {
        favoriteList: response.message
          ? response.message.favoriteNews.map((like: LikeData) => ({
              id: like.id,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getLikeData };
}
