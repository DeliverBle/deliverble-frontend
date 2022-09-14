import { api } from '@src/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { LoginState } from 'src/stores/LoginState';

function OAuthRedirectHandler() {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState('');
  const setIsLoggedIn = useSetRecoilState(LoginState);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('currentPath') || '/');
  }, []);

  const code = router.query.code as string;
  const { data } = useQuery(['accessToken'], () => api.loginUserService.requestLogin(code), {
    onSuccess: () => {
      if (data?.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }
      if (localStorage.getItem('token')) {
        setIsLoggedIn(true);
      }
      router.push(prevLink);
    },
    onError: () => {
      console.error('로그인 에러');
    },
    enabled: !!code,
  });

  return <></>;
}

export default OAuthRedirectHandler;
