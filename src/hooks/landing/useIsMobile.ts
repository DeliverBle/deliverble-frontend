import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  const mobile = useMediaQuery({ query: '(max-width:767px)' });

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile;
}

export default useIsMobile;
