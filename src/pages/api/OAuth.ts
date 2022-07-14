//테스트 REST API
const CLIENT_ID = '7b7f29cbf186eaa7c854075e1c8c1779';
//backend와 협의하는 부분.
const REDIRECT_URI = 'http://localhost:3000/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
