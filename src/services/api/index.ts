import { learnDetailDataMock } from '../mock/learn-detail';
import { LearnDetailService } from './learn-detail';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const learnDetailService = learnDetailDataMock();
  return { learnDetailService };
}

export interface APIService {
  learnDetailService: LearnDetailService;
}
