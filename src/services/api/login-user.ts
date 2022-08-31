import { LoginRequestBody, LoginResponseBody, UserData } from './types/user';

export interface LoginUserService {
  requestLogin(code: LoginRequestBody): Promise<LoginResponseBody>;
  getUserInfo(access_token: LoginResponseBody): Promise<UserData>;
}
