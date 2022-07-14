import styled from 'styled-components';
import { KAKAO_AUTH_URL } from 'src/pages/api/OAuth';
import Link from 'next/link';

function Login() {
  return (
    <Link href={KAKAO_AUTH_URL}>
      <StLoginButton>
        <a>카카오로그인</a>
      </StLoginButton>
    </Link>
  );
}

export default Login;

const StLoginButton = styled.button`
  cursor: pointer;
  border-radius: 4rem;
  width: 30rem;
  height: 15rem;
  background-color: #fee003;
`;
