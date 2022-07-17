import { HomeService } from './home';
import { homeDataMock } from '../mock/home';
import { LearnService } from './learn';
import { LearnDataRemote } from '../remote/learn';
import { LearnDetailService } from './learn-detail';
import { LearnDetailDataRemote } from '../remote/learn-detail';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataMock();
  const learnService = LearnDataRemote();
  const learnDetailService = LearnDetailDataRemote();
  return { homeService, learnService, learnDetailService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
}
