import { api } from '@src/services/api';
import { useQuery } from '@tanstack/react-query';

export const useGetRecommendVideoList = () => {
  return useQuery(['getRecommendVideoList'], () => api.homeService.getVideoData());
};

export const useGetSpeechGuideList = () => {
  return useQuery(['getSpeechGuideList'], () => api.homeService.getSpeechGuideData());
};
