import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

function OAuthRedirectHandler() {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState('');
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('currentPath') || '/');
  }, []);

  const code = router.query.code as string;
  const { data } = useQuery(['accessToken'], () => api.commonService.requestLogin(code), {
    onSuccess: () => {
      setIsLoggedIn(true);
      router.push(prevLink === '/' ? '/home' : prevLink);
    },
    onError: () => {
      console.error('로그인 에러');
    },
    enabled: !!code,
  });

  useEffect(() => {
    data && localStorage.setItem('token', data);
  }, [data]);

  return <></>;
}

export default OAuthRedirectHandler;
