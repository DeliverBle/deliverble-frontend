import { LoginUser } from '@src/services/api/types/user';
import { atom } from 'recoil';

export const loginUserState = atom<LoginUser>({
  key: 'loginUserState',
  default: {
    kakaoId: '',
    nickname: '',
    email: '',
    gender: '',
  },
});

export const authState = atom<boolean>({
  key: 'authState',
  default: false,
});
