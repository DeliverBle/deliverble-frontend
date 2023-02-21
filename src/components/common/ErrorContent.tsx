import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import Link from 'next/link';
import { imgFallbackBg } from 'public/assets/images';
import React from 'react';
import styled from 'styled-components';

interface ErrorContentProps {
  statusCode: number;
  errorMessage: string;
}

function ErrorContent(props: ErrorContentProps) {
  const { statusCode, errorMessage } = props;
  return (
    <StErrorContent>
      <h1>{statusCode}</h1>
      <h2>{errorMessage}</h2>
      {statusCode === 404 ? (
        <Link href="/home">
          <a>홈으로 돌아가기</a>
        </Link>
      ) : (
        <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer noopener">
          에러 제보하기
        </a>
      )}
    </StErrorContent>
  );
}

export default ErrorContent;

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
