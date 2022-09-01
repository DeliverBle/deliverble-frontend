import { LoginUserService } from '../api/login-user';

export function loginUserRemote(): LoginUserService {
  const requestLogin = async (code: string) => {
    const response = await fetch('http://3.36.120.112:8080/login-or-signup');
    return response;
  };

  return { requestLogin };
}
