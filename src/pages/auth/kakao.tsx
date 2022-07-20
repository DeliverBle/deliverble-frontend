import { getAccessTokenAndId } from '@src/services/api/login-user';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthRedirectHandler() {
  // const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    console.log(code);
    getAccessTokenAndId(code).then((response) => {
      console.log('성공');
      console.log(response);
      //router.push('/home');
    });
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
