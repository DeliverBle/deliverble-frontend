import { LikeService } from './../api/like';
import { privateAPI } from './base';

export function likeDataRemote(): LikeService {
  const postLikeData = async (newsId: number) => {
    const response = await privateAPI.post({ url: `/user/favorite/${newsId}` });
    if (response.status === 200) {
      return {
        likeData: {
          id: response.data.newsId,
          isFavorite: response.data.isFavorite,
        },
      };
    } else throw '서버 통신 실패';
  };

  return { postLikeData };
}
