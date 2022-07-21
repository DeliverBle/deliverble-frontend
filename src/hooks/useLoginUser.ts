import { LoginUser } from '@src/services/api/types/user';
import { authState, loginUserState } from '@src/stores/login-user';
import { useRecoilState } from 'recoil';

function useLoginUser() {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);

  const setAccessToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  // 로그아웃 용도로 removeAccessToken 필요

  const saveLoginUser = (loginUser: LoginUser) => {
    setLoginUser(loginUser);
    setIsAuthenticated(true);
  };

  return {
    ...loginUser,
    setAccessToken,
    saveLoginUser,
    isAuthenticated,
  };
}

export default useLoginUser;
