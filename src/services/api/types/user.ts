type TokenInfo = {
  access_token: string;
};

type UserIdInfo = {
  kakaoId: number;
};

export type PostLoginRequestBody = {
  accessToken: string;
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
