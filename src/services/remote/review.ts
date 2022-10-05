import { ReviewService } from '../api/review';
import { VideoData } from '../api/types/review';
import { privateAPI } from './base';

export function reviewDataRemote(): ReviewService {
  const getFavoriteVideoList = async () => {
    const response = await privateAPI.get({ url: `/news/favorite` });
    if (response.status === 200) {
      return {
        favoriteNews: response.data
          ? response.data.exploreNewsDtoCollection.map((video: VideoData) => ({
              id: video.id,
              title: video.title,
              category: video.category,
              channel: video.channel,
              thumbnail: video.thumbnail,
              reportDate: video.reportDate,
              isFavorite: video.isFavorite,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getFavoriteVideoList };
}
