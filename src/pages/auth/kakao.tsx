import { useEffect } from 'react';

function OAuthRedirectHandler() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code') ?? '';
    console.log(code);
  }, []);
  return <></>;
}

export default OAuthRedirectHandler;
