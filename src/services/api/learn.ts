import { PostSearchConditionRequestBody, PostSearchConditionResponse } from './types/learn';

export interface LearnService {
  postSearchCondition(body: PostSearchConditionRequestBody): Promise<PostSearchConditionResponse>;
}
