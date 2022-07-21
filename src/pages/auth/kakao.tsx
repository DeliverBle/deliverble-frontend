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
        const { kakaoId } = response.userInfo;
        console.log(accessToken);
        console.log(kakaoId);
      }
    });
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
