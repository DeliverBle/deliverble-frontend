import { LikeService } from './../api/like';
import { API } from './base';

export function likeDataRemote(): LikeService {
  const postLikeData = async (newsId: number) => {
    const response = await API.post({ url: `/user/favorite/${newsId}` });
    if (response.statusCode === 200) {
      return {
        id: response.data.newsId,
        isFavorite: response.data.isFavorite,
      };
    } else throw '서버 통신 실패';
  };

  return { postLikeData };
}
