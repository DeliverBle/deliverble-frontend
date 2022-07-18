import { VideoData } from '../api/types/home';
import { HomeService } from './../api/home';
import { publicAPI } from './base';

export function homeDataRemote(): HomeService {
  const getVideoData = async () => {
    const response = await publicAPI.get({ url: `/news/recommend` });
    return {
      videoList: response.data
        ? response.data.map((video: VideoData) => ({
            id: video.id,
            title: video.title,
            category: video.category,
            channel: video.channel,
            thumbnail: video.thumbnail,
            reportDate: video.reportDate,
          }))
        : [],
    };
  };

  return { getVideoData };
}
