import { useEffect } from 'react';

interface ClickOutsideProps {
  event?: string;
  isEnabled: boolean;
  handleClickOutside: (e: Event) => void;
}

function useClickOutside(props: ClickOutsideProps) {
  const { isEnabled, event = 'mousedown', handleClickOutside } = props;

  useEffect(() => {
    if (isEnabled) {
      window.addEventListener(event, handleClickOutside);
    }
    return () => {
      window.removeEventListener(event, handleClickOutside);
    };
  }, [event, isEnabled, handleClickOutside]);
}

export default useClickOutside;
