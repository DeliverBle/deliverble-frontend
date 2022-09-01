import { api } from '@src/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { LoginState } from 'src/stores/LoginState';

function OAuthRedirectHandler() {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('currentPath') || '/');
  }, []);

  const code = router.query.code as string;
  const { data: accessToken } = useQuery(['accessToken'], () => api.loginUserService.requestLogin(code), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      console.log('로그인 성공 !!!');
      if (localStorage.getItem('token')) setIsLoggedIn(true);
      router.push(prevLink);
    },
    onError: () => {
      console.log('로그인 에러');
    },
    enabled: !!code,
  });

  return <></>;
}

export default OAuthRedirectHandler;
