import { VideoData } from '../api/types/home';
import { HomeService } from './../api/home';
import { API } from './base';

export function homeDataRemote(): HomeService {
  const getVideoData = async () => {
    const response = await API.get({ url: `/news/recommend` });
    if (response.statusCode === 200) {
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
              haveGuide: video.haveGuide,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  const getSpeechGuideData = async () => {
    const response = await API.get({ url: `/news/guide` });
    if (response.statusCode === 200) {
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
              haveGuide: video.haveGuide,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getVideoData, getSpeechGuideData };
}
