import { api } from '@src/services/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    const storage = globalThis?.sessionStorage;
    const prevLink = storage.getItem('currentPath') || '/';

    api.loginUserService
      .requestLogin({ code })
      .then((response) => {
        localStorage.setItem('token', response.access_token);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        router.push(prevLink);
      });
  }, []);

  return <></>;
}

export default OAuthRedirectHandler;
