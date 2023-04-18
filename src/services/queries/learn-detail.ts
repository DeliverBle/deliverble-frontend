import { queryClient } from '@src/pages/_app';
import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { VideoData } from '@src/types/learnDetail/remote';
import { useMutation, useQuery } from '@tanstack/react-query';
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

export const usePostNewScriptData = () => {
  return useMutation(api.learnDetailService.postNewScriptData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};

export const useDeleteScriptData = () => {
  return useMutation(api.learnDetailService.deleteScriptData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};

export const useUpdateScriptNameData = () => {
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
  return useMutation(api.learnDetailService.postSentenceData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};

export const usePostMemoData = () => {
  return useMutation(api.learnDetailService.postMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};

export const useUpdateMemoData = () => {
  return useMutation(api.learnDetailService.updateMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};

export const useDeleteMemoData = () => {
  return useMutation(api.learnDetailService.deleteMemoData, {
    onSuccess: (data, { clickedTitleIndex }) => {
      queryClient.setQueryData<VideoData>(['getVideoData', data.id, clickedTitleIndex, false], (oldData) => {
        return { ...oldData, ...data };
      });
    },
  });
};
