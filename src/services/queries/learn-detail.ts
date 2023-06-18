import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { VideoData } from '@src/types/learnDetail/remote';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetVideoData = (speechGuide: boolean, videoId: number, index?: number) => {
  const isLoggedIn = useRecoilValue(loginState);
  return useQuery(
    ['getVideoData', videoId, index, speechGuide],
    speechGuide
      ? () => api.learnDetailService.getSpeechGuideData(videoId)
      : isLoggedIn
      ? () => api.learnDetailService.getPrivateVideoData(videoId, index as number)
      : () => api.learnDetailService.getPublicVideoData(videoId),
    {
      enabled: !!videoId,
      cacheTime: speechGuide || !isLoggedIn ? Infinity : 300000,
      staleTime: speechGuide || !isLoggedIn ? Infinity : 0,
    },
  );
};

const updateVideoData = (queryClient: QueryClient, data: VideoData, clickedTitleIndex: number) => {
  queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
    return { ...oldData, ...data };
  });
};

export const usePostNewScriptData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.postNewScriptData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};

export const useDeleteScriptData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.deleteScriptData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};

export const useUpdateScriptNameData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.updateScriptNameData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        if (oldData?.names && data.name) {
          const names = [...oldData.names];
          names[clickedTitleIndex].name = data.name;
          return { ...oldData, names };
        }
        return oldData;
      });
    },
  });
};

export const useGetSimilarVideoData = (videoId: number) => {
  return useQuery(['getSimilarVideoList', videoId], () => api.learnDetailService.getSimilarVideoData(videoId), {
    enabled: !!videoId,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export const usePostSentenceData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.postSentenceData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};

export const usePostMemoData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.postMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};

export const useUpdateMemoData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.updateMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};

export const useDeleteMemoData = () => {
  const queryClient = useQueryClient();
  return useMutation(api.learnDetailService.deleteMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => updateVideoData(queryClient, data, clickedTitleIndex),
  });
};
