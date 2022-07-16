import { useEffect, useRef } from 'react';

export const useSlideObserver = (
  setState: (stateNumber: number) => void,
  stateNumber: number,
): React.MutableRefObject<HTMLElement | null> => {
  const isRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    const observePoint: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          setState(stateNumber);
          observer.observe(entry.target);
        }
      });
    };

    if (isRef.current) {
      observer = new IntersectionObserver(observePoint, {
        threshold: 0.9,
      });
      observer.observe(isRef.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [setState, stateNumber]);

  return isRef;
};
