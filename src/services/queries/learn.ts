import { api } from '@src/services/api';
import { PostSearchConditionRequestBody } from '@src/types/learn/remote';
import { useQuery } from '@tanstack/react-query';

export const usePostSearchCondition = (data: PostSearchConditionRequestBody) => {
  return useQuery(['postSearchCondition', data], () => api.learnService.postSearchCondition(data), {
    keepPreviousData: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
