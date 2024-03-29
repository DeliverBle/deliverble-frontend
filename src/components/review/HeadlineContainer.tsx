import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { icScript } from 'public/assets/icons/index';
import { COLOR, FONT_STYLES } from '@src/styles';

function HeadlineContainer() {
  return (
    <StHeadlineContainer>
      <ImageDiv src={icScript} className="script" layout="fill" alt="" />
      <h1>
        한 번으로 끝내지 마세요!
        <br />
        복습으로 매력적인 목소리를 만들어요.
      </h1>
    </StHeadlineContainer>
  );
}

export default HeadlineContainer;

const StHeadlineContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 14.8rem;

  .script {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
  }
`;
