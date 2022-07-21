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

export type UserInfo = {
  kakaoId: string;
  nickname: string;
  email?: string;
  gender?: string;
};

export interface LoginUser {
  tokenInfo: TokenInfo;
  userInfo: UserIdInfo;
}
