import { AccessToken, UserData } from './types/user';

export interface LoginUserService {
  requestLogin(code: string): Promise<AccessToken>;
  getUserInfo(access_token: string): Promise<UserData>;
}
