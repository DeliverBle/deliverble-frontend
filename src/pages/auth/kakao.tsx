import { getAccessTokenAndId, postJoin, postLogin } from '@src/services/api/login-user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { constSelector } from 'recoil';

function OAuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    const storage = globalThis?.sessionStorage;
    const prevLink = storage.getItem('currentPath') || '/';

    getAccessTokenAndId(code).then((response) => {
      if (response?.tokenInfo && response?.userInfo) {
        const { access_token: accessToken } = response.tokenInfo;
        const { kakaoId } = response.userInfo;

        // accessToken이랑 kakaoId로 회원가입
        postJoin({ access_token: accessToken, user_id: kakaoId.toString() })
          .then(() => {
            // 회원가입 성공하면 로그인
            postLogin({ access_token: accessToken, user_id: kakaoId.toString() }).then((response) => {
              localStorage.setItem('token', accessToken);
              localStorage.setItem('userId', kakaoId.toString());
              localStorage.setItem('email', response.email);
              localStorage.setItem('nickname', response.nickname);
              router.push(prevLink);
            });
          })
          .catch((error) => {
            console.log(error);
            // 이미 회원이면 로그인
            if (error === '회원가입 실패') {
              postLogin({ access_token: accessToken, user_id: kakaoId.toString() }).then((response) => {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('userId', kakaoId.toString());
                localStorage.setItem('email', response.email);
                localStorage.setItem('nickname', response.nickname);
                router.push(prevLink);
              });
            }
          });
      }
    });
  }, [router]);

  return <></>;
}

export default OAuthRedirectHandler;
