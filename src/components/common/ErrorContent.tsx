import { Footer, NavigationBar } from '@src/components/common';
import { STATUS_CODE } from '@src/constants/common';
import { loginState } from '@src/stores/loginState';
import { COLOR, FONT_STYLES } from '@src/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { imgErrorBg } from 'public/assets/images';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

interface ErrorContentProps {
  statusCode: number;
  errorMessage: string;
}

function ErrorContent(props: ErrorContentProps) {
  const { statusCode, errorMessage } = props;
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);

  if (statusCode === 401) {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.reload();
    return <></>;
  }

  return (
    <>
      <NavigationBar />
      <StErrorContent>
        <h1>{statusCode}</h1>
        <h2>{errorMessage}</h2>
        {statusCode === STATUS_CODE.NOT_FOUND ? (
          <Link href="/home">
            <a>홈으로 돌아가기</a>
          </Link>
        ) : (
          <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer noopener">
            에러 제보하기
          </a>
        )}
      </StErrorContent>
      <Footer />
    </>
  );
}

export default ErrorContent;

const StErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 108rem;
  background: url(${imgErrorBg.src}) center/cover no-repeat;

  h1 {
    font-family: 'Dongle';
    font-size: 25rem;
    color: ${COLOR.MAIN_BLUE};
    margin-bottom: 7.2rem;
    line-height: 3rem;
  }

  h2 {
    ${FONT_STYLES.M_28_HEADLINE};
    margin-bottom: 11rem;
    color: ${COLOR.BLACK};
    text-align: center;
    white-space: pre-line;
  }

  a {
    background-color: ${COLOR.MAIN_BLUE};
    border-radius: 1.4rem;
    padding: 2rem 4rem;
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_24_HEADLINE};
  }
`;
