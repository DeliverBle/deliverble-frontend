import { homeDataMock } from '../mock/home';
import { HomeService } from './home';
import { LearnService } from './learn';
import { learnDataMock } from '../mock/learn';
import { learnDetailDataMock } from '../mock/learn-detail';
import { LearnDetailService } from './learn-detail';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataMock();
  const learnService = learnDataMock();
  const learnDetailService = learnDetailDataMock();

  return { homeService, learnService, learnDetailService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
}
