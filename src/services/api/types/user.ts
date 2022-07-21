type TokenInfo = {
  access_token: string;
};

type UserIdInfo = {
  kakaoId: number;
};

export type JoinAndLoginRequestBody = {
  access_token: string;
  user_id: string;
};

export type JoinResponseBody = {
  userId: string;
};

export interface TokenAndUserInfo {
  tokenInfo: TokenInfo;
  userInfo: UserIdInfo;
}

export interface LoginUser {
  kakaoId: string;
  nickname: string;
  email?: string;
  gender?: string;
}
