import styled from 'styled-components';
import { icScript } from 'public/assets/icons/index';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';

function HeadlineContainer() {
  return (
    <StHeadlineContainer>
      <ImageDiv src={icScript} className="script" layout="fill" alt="" />
      <StHeadLineWrapper>
        <p>한번으로 끝내지 마세요!</p>
        <p>복습으로 매력적인 목소리를 만들어요!</p>
      </StHeadLineWrapper>
    </StHeadlineContainer>
  );
}

export default HeadlineContainer;

const StHeadlineContainer = styled.section`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 14.8rem;

  .script {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }
`;

const StHeadLineWrapper = styled.section`
  display: flex;
  flex-direction: column;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_32_HEADLINE};
`;
