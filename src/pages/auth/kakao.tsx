import { getAccessTokenAndId } from '@src/services/api/login-user';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthRedirectHandler() {
  // const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    getAccessTokenAndId(code).then((response) => {
      console.log('성공');
      if (response?.tokenInfo) {
        const { access_token } = response.tokenInfo;
        const accessToken = access_token;
        const { email, kakaoId, nickname } = response.userInfo;
        console.log(accessToken);
        console.log(email);
        console.log(kakaoId);
        console.log(nickname);
        // navigate('/home');
      }
      //router.push('/home');
    });
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
