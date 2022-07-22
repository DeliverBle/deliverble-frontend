import { ReviewService } from '../api/review';
import { VideoData } from '../api/types/review';
import { privateAPI } from './base';

export function reviewDataRemote(): ReviewService {
  const getFavoriteVideoList = async () => {
    const response = await privateAPI.get({ url: `/user/favorite/all` });
    if (response.status === 200) {
      console.log(response.message.favoriteNews);
      return {
        favoriteNews: response.message.favoriteNews
          ? response.message.favoriteNews.map((video: VideoData) => ({
              id: video.id,
              title: video.title,
              category: video.category,
              channel: video.channel,
              thumbnail: video.thumbnail,
              reportDate: video.reportDate,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getFavoriteVideoList };
}
