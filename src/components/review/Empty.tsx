import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { imgReviewEmpty } from 'public/assets/images';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import Link from 'next/link';

interface EmptyProps {
  tab: string;
}

function Empty(props: EmptyProps) {
  const { tab } = props;

  return (
    <StEmpty>
      <ImageDiv src={imgReviewEmpty} className="empty" layout="fill" alt="" />
      <StTitle>아직 {tab === 'favorite' ? '즐겨찾기 한' : '학습한'} 영상이 없어요!</StTitle>
      <StDescription>지금 바로 쉐도잉하러 가볼까요?</StDescription>
      <Link href="/learn" passHref>
        <StLearnButton>학습하러 가기</StLearnButton>
      </Link>
    </StEmpty>
  );
}

export default Empty;

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty {
    position: relative;
    width: 32rem;
    height: 32rem;
  }
`;

const StTitle = styled.p`
  margin-top: 1.6rem;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_32_HEADLINE};
`;

const StDescription = styled.p`
  margin-top: 1.2rem;
  color: ${COLOR.GRAY_30};
  ${FONT_STYLES.M_24_HEADLINE};
`;

const StLearnButton = styled.a`
  margin: 8rem 0 24.3rem 0;
  padding: 2rem 4rem;
  background-color: ${COLOR.MAIN_BLUE};
  border-radius: 1.4rem;
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE};
  text-align: center;
  cursor: pointer;
`;
