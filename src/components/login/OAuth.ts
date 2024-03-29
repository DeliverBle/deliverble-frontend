const isProduction = process.env.NODE_ENV === 'production';
const DOMAIN = isProduction ? 'https://deliverble.kr' : 'http://localhost:3000';
const CLIENT_ID = `${process.env.NEXT_PUBLIC_CLIENT_ID}`;
const REDIRECT_URI = `${DOMAIN}/auth/callback/kakao`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
