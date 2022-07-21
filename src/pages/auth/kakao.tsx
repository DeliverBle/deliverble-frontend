import { getAccessTokenAndId, postJoin, postLogin } from '@src/services/api/login-user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    getAccessTokenAndId(code).then((response) => {
      if (response?.tokenInfo && response?.userInfo) {
        const { access_token: accessToken } = response.tokenInfo;
        const { kakaoId } = response.userInfo;

        // accessToken이랑 kakaoId로 회원가입
        postJoin({ access_token: accessToken, user_id: kakaoId.toString() })
          .then(() => {
            // 회원가입 성공하면 로그인
            postLogin({ access_token: accessToken, user_id: kakaoId.toString() });
          })
          .catch((error) => {
            // 이미 회원이면 로그인 시키고, 이전 페이지로 이동
            if (error === '회원가입 실패') {
              postLogin({ access_token: accessToken, user_id: kakaoId.toString() }).then((response) => {
                console.log(response);
                router.back();
              });
            } else {
              router.back();
            }
          });
      }
    });
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
