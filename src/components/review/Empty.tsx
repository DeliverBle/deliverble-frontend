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
      {tab === 'isLiked' ? <div>아직 즐겨찾기 한 영상이 없어요!</div> : <div>Coming Soon</div>}
      {tab === 'isLiked' ? <div>지금 바로 쉐도잉하러 가볼까요?</div> : <div>내 학습 기록을 곧 만나보실 수 있어요!</div>}
      <Link href="/learn">
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
    width: 38.8rem;
    height: 28.8rem;
  }

  & > div:nth-of-type(2) {
    margin-top: 1.6rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
  }

  & > div:last-of-type {
    margin-top: 1.2rem;
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_24_HEADLINE};
  }
`;

const StLearnButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26rem;
  height: 7rem;
  margin-top: 8rem;

  background-color: ${COLOR.MAIN_BLUE};
  border-radius: 14rem;

  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE};

  cursor: pointer;
`;
