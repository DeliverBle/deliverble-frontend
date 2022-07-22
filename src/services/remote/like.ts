import { LikeData, PostLikeRequestBody } from './../api/types/like';
import { LikeService } from './../api/like';
import { privateAPI } from './base';

export function likeDataRemote(): LikeService {
  const getLikeData = async () => {
    const response = await privateAPI.get({ url: `/user/favorite/all` });
    if (response.status === 200) {
      return {
        favoriteList: response.message
          ? response.message.favoriteNews.map((like: LikeData) => ({
              id: like.id,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  const postLikeData = async (body: PostLikeRequestBody) => {
    const response = await privateAPI.post({ url: `/user/favorite/add`, data: body });
    if (response.status === 200) {
      return {
        favoriteList: response.message
          ? response.message.favoriteNews.map((like: LikeData) => ({
              id: like.id,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  const deleteLikeData = async (body: PostLikeRequestBody) => {
    const response = await privateAPI.post({ url: `/user/favorite/add`, data: body });
    if (response.status === 200) {
      return {
        favoriteList: response.message
          ? response.message.favoriteNews.map((like: LikeData) => ({
              id: like.id,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getLikeData, postLikeData, deleteLikeData };
}
