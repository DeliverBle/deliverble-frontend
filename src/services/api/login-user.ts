import { UserData } from './types/user';

export interface LoginUserService {
  requestLogin(code: string): Promise<string | undefined>;
  getUserInfo(accessToken: string | null): Promise<UserData>;
}
