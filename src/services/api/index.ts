import { HomeService } from './home';
import { HomeDataMock } from '../mock/home';
import { LearnService } from './learn';
import { LearnDataRemote } from '../remote/learn';
import { LearnDetailService } from './learn-detail';
import { LearnDetailDataRemote } from '../remote/learn-detail';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = HomeDataMock();
  const learnService = LearnDataRemote();
  const learnDetailService = LearnDetailDataRemote();
  return { homeService, learnService, learnDetailService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
}
