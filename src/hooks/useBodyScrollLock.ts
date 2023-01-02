import { useCallback } from 'react';

export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
  }, []);

  return { lockScroll, unlockScroll };
}
