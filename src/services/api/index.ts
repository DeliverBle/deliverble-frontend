import { homeDataRemote } from '../remote/home';
import { learnDataRemote } from '../remote/learn';
import { learnDetailDataRemote } from '../remote/learn-detail';
import { likeDataRemote } from '../remote/like';
import { loginUserRemote } from '../remote/login-user';
import { reviewDataRemote } from '../remote/review';
import { HomeService } from './home';
import { LearnService } from './learn';
import { LearnDetailService } from './learn-detail';
import { LikeService } from './like';
import { LoginUserService } from './login-user';
import { ReviewService } from './review';

export const api: APIService = getAPIMethod();

function getAPIMethod(): APIService {
  return provideMockAPIService();
}

function provideMockAPIService(): APIService {
  const homeService = homeDataRemote();
  const learnService = learnDataRemote();
  const learnDetailService = learnDetailDataRemote();
  const likeService = likeDataRemote();
  const reviewService = reviewDataRemote();
  const loginUserService = loginUserRemote();
  return { homeService, learnService, learnDetailService, reviewService, likeService, loginUserService };
}

export interface APIService {
  homeService: HomeService;
  learnService: LearnService;
  learnDetailService: LearnDetailService;
  reviewService: ReviewService;
  likeService: LikeService;
  loginUserService: LoginUserService;
}
