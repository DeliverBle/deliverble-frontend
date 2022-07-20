// import { api } from '@src/services/api';
// import { LoginUser } from '@src/services/api/types/user';

function LoginModal() {
  //   const setAccessToken = (accessToken: string) => {
  //     localStorage.setItem('token', accessToken);
  //     initLoginUser();
  //   };

  //   const saveLoginUser = (loginUser: LoginUser) => {
  //     localStorage.setItem('token', loginUser.accessToken);
  //   };

  //   const initLoginUser = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) throw '토큰이 없습니다';
  //       const user = await api.loginUserService.getUserInfo(token);
  //       saveLoginUser(user);
  //     } catch (error) {
  //       error;
  //     }
  //   };

  //   return {
  //     setAccessToken,
  //     saveLoginUser,
  //     initLoginUser,
  //   };
  return <div>LoginUser</div>;
}

export default LoginModal;
