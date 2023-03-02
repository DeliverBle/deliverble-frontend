import { HomeService } from './../api/home';
import { API } from './base';

export function homeDataRemote(): HomeService {
  const getVideoData = async () => {
    const response = await API.get({ url: `/news/recommend` });
    if (response.statusCode === 200) {
      return {
        videoList: response.data ? response.data.exploreNewsDtoCollection : [],
      };
    } else throw '서버 통신 실패';
  };

  const getSpeechGuideData = async () => {
    const response = await API.get({ url: `/news/guide` });
    if (response.statusCode === 200) {
      return {
        videoList: response.data ? response.data.exploreNewsDtoCollection : [],
      };
    } else throw '서버 통신 실패';
  };

  return { getVideoData, getSpeechGuideData };
}
