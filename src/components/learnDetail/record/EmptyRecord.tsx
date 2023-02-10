import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icRecordEmpty } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from '@src/components/common/ImageDiv';

function EmptyRecord() {
  return (
    <StEmptyRecord>
      <ImageDiv src={icRecordEmpty} className="icRecordEmpty" layout="fill" />
      <p>저장된 녹음이 없습니다.</p>
      <p>녹음을 추가해보세요!</p>
    </StEmptyRecord>
  );
}

export default EmptyRecord;

const StEmptyRecord = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .icRecordEmpty {
    position: relative;

    margin-top: 4.4rem;
    width: 10rem;
    height: 10rem;
  }

  & > p:nth-of-type(1) {
    padding-top: 2.4rem;

    color: ${COLOR.GRAY_45};
    ${FONT_STYLES.B_20_BODY};
  }

  & > p:nth-of-type(2) {
    padding-top: 0.8rem;

    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_16_CAPTION};
  }
`;
