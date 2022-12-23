import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'isGuide',
  storage: sessionStorage,
});

export const isGuideAtom = atom<boolean>({
  key: 'isGuideAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
