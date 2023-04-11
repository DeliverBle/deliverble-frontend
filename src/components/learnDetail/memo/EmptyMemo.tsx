import ImageDiv from '@src/components/common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { imgMemoEmpty } from 'public/assets/images';
import styled from 'styled-components';

function EmptyMemo() {
  return (
    <StEmptyMemo>
      <ImageDiv src={imgMemoEmpty} className="memo-empty" layout="fill" />
      <p>저장된 메모가 없습니다.</p>
      <p>메모를 추가해보세요!</p>
    </StEmptyMemo>
  );
}

export default EmptyMemo;

const StEmptyMemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .memo-empty {
    position: relative;

    margin-top: 4.4rem;
    width: 10rem;
    height: 10rem;
  }

  p:nth-of-type(1) {
    padding-top: 2.4rem;

    color: ${COLOR.GRAY_45};
    ${FONT_STYLES.B_20_BODY};
  }

  p:nth-of-type(2) {
    padding-top: 0.8rem;

    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_16_CAPTION};
  }
`;
