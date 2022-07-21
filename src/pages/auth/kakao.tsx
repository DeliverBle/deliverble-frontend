import { getAccessTokenAndId } from '@src/services/api/login-user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    getAccessTokenAndId(code).then(({ tokenInfo, userInfo }) => {
      console.log('성공');
      if (tokenInfo && userInfo) {
        const { access_token: accessToken } = tokenInfo;
        const { kakaoId } = userInfo;
        console.log(accessToken);
        console.log(kakaoId);
        router.back();
      }
    });
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
