type TokenInfo = {
  access_token: string;
};

type UserIdInfo = {
  kakaoId: number;
};

export interface LoginUser {
  tokenInfo: TokenInfo;
  userInfo: UserIdInfo;
}
