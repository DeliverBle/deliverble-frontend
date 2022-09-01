import { UserData } from './types/user';

export interface LoginUserService {
  requestLogin(code: string): Promise<string>;
  getUserInfo(access_token: string): Promise<UserData>;
}
