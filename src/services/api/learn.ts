import { PostSearchConditionRequestBody, PostSearchConditionResponse } from '@src/types/learn/remote';

export interface LearnService {
  postSearchCondition(body: PostSearchConditionRequestBody): Promise<PostSearchConditionResponse>;
}
