//로그인 요청시 보내는 인가 코드
export interface LoginRequestBody {
  code: string;
}

//인가 코드 보내고 받는 엑세스 토큰
export interface LoginResponseBody {
  access_token: string;
}

export interface UserData {
  // kakaoId: string;
  nickname: string;
  email?: string;
  gender?: string;
}
