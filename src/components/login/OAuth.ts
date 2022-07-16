//테스트 REST API
const CLIENT_ID = '3c72adb081c3a1922f06614930f30782';
const REDIRECT_URI = 'http://localhost:3000/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
