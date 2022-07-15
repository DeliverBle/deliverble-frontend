import { useEffect, useRef } from 'react';

export const useSlideObserver = (
  setState: (stateNumber: number) => void,
  stateNumber: number,
): React.MutableRefObject<HTMLElement | null> => {
  const isRef = useRef<HTMLElement | null>(null);

  const observePoint: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        //props로 받은 슬라이드가 intersecting될 때
        setState(stateNumber);
        observer.observe(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (isRef.current) {
      observer = new IntersectionObserver(observePoint, {
        threshold: 0.9,
      });
      observer.observe(isRef.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, []);

  return isRef;
};
