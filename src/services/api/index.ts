import { HomeService } from './home';
import { homeDataRemote } from '../remote/home';
import { LearnService } from './learn';
import { learnDataRemote } from '../remote/learn';
import { LearnDetailService } from './learn-detail';
import { learnDetailDataRemote } from '../remote/learn-detail';
import { ReviewService } from './review';
import { likeDataRemote } from '../remote/like';
import { LikeService } from './like';
// import { likeDataMock } from '../mock/like';
import { reviewDataRemote } from '../remote/review';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataRemote();
  const learnService = learnDataRemote();
  const learnDetailService = learnDetailDataRemote();
  const likeService = likeDataRemote();
  // const likeService = like
  likeService: any;DataMock();
  const reviewService = reviewDataRemote();
  return { homeService, learnService, learnDetailService, reviewService, likeService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
  reviewService: ReviewService;
  likeService: LikeService;
}
