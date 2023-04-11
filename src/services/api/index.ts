import { CommonService } from '@src/services/api/common';
import { commonDataRemote } from '@src/services/remote/common';
import { homeDataRemote } from '../remote/home';
import { learnDataRemote } from '../remote/learn';
import { learnDetailDataRemote } from '../remote/learn-detail';
import { reviewDataRemote } from '../remote/review';
import { HomeService } from './home';
import { LearnService } from './learn';
import { LearnDetailService } from './learn-detail';
import { ReviewService } from './review';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataRemote();
  const learnService = learnDataRemote();
  const learnDetailService = learnDetailDataRemote();
  const commonService = commonDataRemote();
  const reviewService = reviewDataRemote();
  return { homeService, learnService, learnDetailService, reviewService, commonService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
  reviewService: ReviewService;
  commonService: CommonService;
}
