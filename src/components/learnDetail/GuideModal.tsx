import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import Portal from '../common/Portal';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  icGuideHighlight,
  icGuideMemo,
  icGuideRecord,
  icGuideScript,
  icGuideSpacing,
  icXButton,
} from 'public/assets/icons';

interface GuideModalProps {
  closeModal: () => void;
}

function GuideModal(props: GuideModalProps) {
  const { closeModal } = props;

  return (
    <Portal selector="#portal">
      <StGuideModal>
        <StGuideModalBackground />
        <StGuideModalContent role="dialog" aria-modal="true" aria-labelledby="title">
          <ImageDiv role="button" onClick={closeModal} src={icXButton} className="x-button" layout="fill" alt="닫기" />
          <div>
            <StModalTitle id="title">어떻게 학습하나요?</StModalTitle>
            <p>
              1. 재생 버튼을 클릭해 아나운서의 뉴스 리딩을 <span>들어보세요</span>
              <br />
              2. 아나운서의 발음, 발성, 장음, 끊어 읽기를 주의 깊게 들으며 거의 동시에 <span>따라 말해보세요</span>
              <br />
              3. 더 연습이 필요한 문장을 클릭해 해당 시점으로 되돌아가 <span>다시 따라 말해보세요</span>
            </p>
          </div>
          <div>
            <StModalTitle>더 똑똑한 쉐도잉을 위해 준비했어요!</StModalTitle>
            <StFunctionContainer>
              <StFunction>
                <ImageDiv src={icGuideHighlight} className="function" layout="fill" alt="" />
                <StFunctionName>하이라이트</StFunctionName>
                <StFunctionDetail>
                  아나운서가 강조하는 단어, 발음이 어려운 단어를 드래그하여 표시해보세요
                </StFunctionDetail>
              </StFunction>
              <StFunction>
                <ImageDiv src={icGuideSpacing} className="function" layout="fill" alt="" />
                <StFunctionName>끊어읽기</StFunctionName>
                <StFunctionDetail>아나운서의 끊어읽기를 주의 깊게 듣고 공백에 표시하며 읽어보세요</StFunctionDetail>
              </StFunction>
              <StFunction>
                <ImageDiv src={icGuideMemo} className="function" layout="fill" alt="" />
                <StFunctionName>메모</StFunctionName>
                <StFunctionDetail>하이라이트를 우클릭해 주의할 내용을 메모해보세요</StFunctionDetail>
              </StFunction>
              <StFunction>
                <ImageDiv src={icGuideRecord} className="function" layout="fill" alt="" />
                <StFunctionName>녹음</StFunctionName>
                <StFunctionDetail>아나운서 쉐도잉으로 달라지는 나의 말하기를 녹음하고 점검해보세요</StFunctionDetail>
              </StFunction>
              <StFunction>
                <ImageDiv src={icGuideScript} className="function" layout="fill" alt="" />
                <StFunctionName>스크립트 추가</StFunctionName>
                <StFunctionDetail>
                  새 스크립트로 다시 연습하며 좋은 말하기를
                  <br />
                  체화해보세요
                </StFunctionDetail>
              </StFunction>
            </StFunctionContainer>
          </div>
        </StGuideModalContent>
      </StGuideModal>
    </Portal>
  );
}

export default GuideModal;

const StGuideModal = styled.div`
  .x-button {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .icon {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StGuideModalBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.78);
  z-index: 2;
`;

const StGuideModalContent = styled.div`
  width: 127.3rem;
  height: 68.5rem;
  padding: 6.4rem;
  border-radius: 2.5rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  & > div {
    & > p {
      margin: 1.6rem 0 5.6rem 0;
      padding: 2.6rem 4rem;
      border-radius: 2rem;
      background-color: ${COLOR.SUB_BLUE_8};
      ${FONT_STYLES.R_20_BODY};

      span {
        font-weight: 700;
      }
    }
  }

  & > div:last-child {
    margin-top: 3.6rem;
  }
`;

const StModalTitle = styled.div`
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_24_HEADLINE};
`;

const StFunctionContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const StFunction = styled.div`
  width: 21.3rem;
  height: 24.1rem;
  padding: 2.4rem 2rem;
  border: 0.2rem solid ${COLOR.GRAY_5};
  border-radius: 20px;

  .function {
    position: relative;
    width: 6rem;
    height: 6rem;
  }
`;

const StFunctionName = styled.div`
  margin: 3.4rem 0 0.4rem 0;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.SB_18_CAPTION};
`;

const StFunctionDetail = styled.p`
  width: 16.8rem;
  color: ${COLOR.GRAY_80};
  ${FONT_STYLES.M_16_CAPTION};
  word-break: keep-all;
`;
