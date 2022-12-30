import { VideoData } from '../api/types/home';
import { HomeService } from './../api/home';
import { privateAPI, publicAPI } from './base';

export function homeDataRemote(): HomeService {
  const getPrivateVideoData = async () => {
    const response = await privateAPI.get({ url: `/news/recommend` });
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

  const getPublicVideoData = async () => {
    const response = await publicAPI.get({ url: `/news/recommend` });
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
              haveGuide: video.haveGuide,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  const getPrivateSpeechGuideData = async () => {
    const response = await privateAPI.get({ url: `/news/guide` });
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

  const getPublicSpeechGuideData = async () => {
    const response = await publicAPI.get({ url: `/news/guide` });
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
              haveGuide: video.haveGuide,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getPrivateVideoData, getPublicVideoData, getPrivateSpeechGuideData, getPublicSpeechGuideData };
}
