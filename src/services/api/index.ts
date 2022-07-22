import { HomeService } from './home';
import { homeDataRemote } from '../remote/home';
import { LearnService } from './learn';
import { learnDataRemote } from '../remote/learn';
import { LearnDetailService } from './learn-detail';
import { learnDetailDataRemote } from '../remote/learn-detail';
import { ReviewService } from './review';
import { reviewDataRemote } from '../remote/review';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataRemote();
  const learnService = learnDataRemote();
  const learnDetailService = learnDetailDataRemote();
  const reviewService = reviewDataRemote();
  return { homeService, learnService, learnDetailService, reviewService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
  reviewService: ReviewService;
}
