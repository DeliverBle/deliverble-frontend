import Footer from '@src/components/common/Footer';
import NavigationBar from '@src/components/common/NavigationBar';
import { CustomError } from '@src/services/api/types/error';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { imgFallbackBg } from 'public/assets/images';
import { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

function ErrorFallback(props: FallbackProps) {
  const { error } = props;
  const customError = error as CustomError;

  return (
    <>
      <NavigationBar />
      {customError && (
        <StErrorContent>
          <h1>{customError.code}</h1>
          <h2>
            {error.message}
            <br />
            에러를 제보해 주시면 더 나은 딜리버블과 함께할 수 있어요!
          </h2>
          <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer noopener">
            에러 제보하기
          </a>
        </StErrorContent>
      )}
      <Footer />
    </>
  );
}

export default ErrorFallback;

const StErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 108rem;
  background: url(${imgFallbackBg.src}) center/cover no-repeat;

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
  }

  a {
    background-color: ${COLOR.MAIN_BLUE};
    border-radius: 1.4rem;
    padding: 2rem 4rem;
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_24_HEADLINE};
  }
`;
