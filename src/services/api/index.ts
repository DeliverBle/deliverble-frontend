import { HomeService } from './home';
import { homeDataRemote } from '../remote/home';
import { LearnService } from './learn';
import { learnDataRemote } from '../remote/learn';
import { LearnDetailService } from './learn-detail';
import { learnDetailDataRemote } from '../remote/learn-detail';
import { loginUserRemote } from '../remote/login-user';
import { LoginUserService } from './login-user';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataRemote();
  const learnService = learnDataRemote();
  const learnDetailService = learnDetailDataRemote();
  const loginUserService = loginUserRemote();
  return { homeService, learnService, learnDetailService, loginUserService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
  loginUserService: LoginUserService;
}
