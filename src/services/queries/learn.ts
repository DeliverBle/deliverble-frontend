import { queryClient } from '@src/pages/_app';
import { api } from '@src/services/api';
import { PostSearchConditionRequestBody } from '@src/types/learn/remote';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetSearchCondition = (data: PostSearchConditionRequestBody) => {
  return useQuery(['postSearchCondition', data], () => api.learnService.postSearchCondition(data), {
    enabled: false,
    keepPreviousData: true,
  });
};

export const usePostSearchCondition = () => {
  return useMutation(api.learnService.postSearchCondition, {
    onSuccess: (data, variables) => queryClient.setQueryData(['postSearchCondition', variables], data),
  });
};
