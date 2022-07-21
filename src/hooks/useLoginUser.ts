import { LoginUser } from '@src/services/api/types/user';
import { authState, loginUserState } from '@src/stores/login-user';
import { useRecoilState } from 'recoil';

function useLoginUser() {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);

  const saveLoginUser = (loginUser: LoginUser) => {
    setLoginUser(loginUser);
    setIsAuthenticated(true);
  };

  return {
    ...loginUser,
    saveLoginUser,
    isAuthenticated,
  };
}

export default useLoginUser;
