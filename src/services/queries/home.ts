import { api } from '@src/services/api';
import { VideoData } from '@src/types/home/remote';
import { useQuery } from '@tanstack/react-query';

export const useGetRecommendVideoList = (initialRecommendNewsList: VideoData[]) => {
  return useQuery(['getRecommendVideoList'], () => api.homeService.getVideoData(), {
    initialData: initialRecommendNewsList,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetSpeechGuideList = (initialSpeechGuideList: VideoData[]) => {
  return useQuery(['getSpeechGuideList'], () => api.homeService.getSpeechGuideData(), {
    initialData: initialSpeechGuideList,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
