import { HomeService } from './../api/home';
import { API } from './base';

export function homeDataRemote(): HomeService {
  const getVideoData = async () => {
    const response = await API.get({ url: `/news/recommend` });
    return response.data.exploreNewsDtoCollection;
  };

  const getSpeechGuideData = async () => {
    const response = await API.get({ url: `/news/guide` });
    return response.data.exploreNewsDtoCollection;
  };

  return { getVideoData, getSpeechGuideData };
}
