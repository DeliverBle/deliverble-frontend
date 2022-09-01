import { api } from '@src/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function OAuthRedirectHandler() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [prevLink, setPrevLink] = useState('');

  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get('code') ?? '');
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('currentPath') || '/');
  }, []);

  const { data: accessToken } = useQuery(['accessToken'], () => api.loginUserService.requestLogin(code), {
    onSuccess: (data) => {
      accessToken && localStorage.setItem('token', data);
      // router.push(prevLink);
    },
  });

  return <></>;
}

export default OAuthRedirectHandler;
