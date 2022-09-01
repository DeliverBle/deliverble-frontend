import { api } from '@src/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function OAuthRedirectHandler() {
  const router = useRouter();
  const [prevLink, setPrevLink] = useState('');

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('currentPath') || '/');
  }, []);

  const code = router.query.code as string;
  const { data: accessToken } = useQuery(['accessToken'], () => api.loginUserService.requestLogin(code), {
    onSuccess: (data) => {
      accessToken && localStorage.setItem('token', data.accessToken);
      console.log('로그인 성공 !!!');
      // router.push(prevLink);
    },
    onError: () => {
      console.log('로그인 에러');
    },
    enabled: !!code,
  });

  return <></>;
}

export default OAuthRedirectHandler;
