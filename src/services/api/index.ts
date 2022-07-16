import { homeDataMock } from '../mock/home';
import { HomeService } from './home';
import { learnDetailDataMock } from '../mock/learn-detail';
import { LearnDetailService } from './learn-detail';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const learnDetailService = learnDetailDataMock();
  const homeService = homeDataMock();
  return { learnDetailService, homeService };
}

export interface APIService {
  homeService: HomeService;
  learnDetailService: LearnDetailService;
}
