import { LearnService } from '../api/learn';
import { API } from './base';
import { PostSearchConditionRequestBody } from '@src/types/learn/remote';

export function learnDataRemote(): LearnService {
  const postSearchCondition = async (body: PostSearchConditionRequestBody) => {
    const response = await API.post({
      url: `/news/search`,
      data: body,
    });
    return {
      videoList: response.data ? response.data.exploreNewsDtoCollection : [],
      paging: response.data2.paginationInfo,
    };
  };

  return { postSearchCondition };
}
