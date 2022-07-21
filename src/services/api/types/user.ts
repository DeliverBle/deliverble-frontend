type TokenInfo = {
  access_token: string;
};

type UserInfo = {
  email?: string;
  kakaoId: number;
  nickname: string;
};

export interface LoginUser {
  tokenInfo: TokenInfo;
  userInfo: UserInfo;
}
