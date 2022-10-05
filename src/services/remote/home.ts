import { VideoData } from '../api/types/home';
import { HomeService } from './../api/home';
import { privateAPI } from './base';

export function homeDataRemote(): HomeService {
  const getVideoData = async () => {
    const response = await privateAPI.get({ url: `/news/recommend` });
    if (response.status === 200) {
      return {
        videoList: response.data
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

  return { getVideoData };
}
