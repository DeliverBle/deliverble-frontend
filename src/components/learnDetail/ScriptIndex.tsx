import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icScriptDeleteLight } from 'public/assets/icons';

interface ScriptIndexProps {
  index: number;
  isOne: boolean;
}

function ScriptIndex(props: ScriptIndexProps) {
  const { index, isOne } = props;
  return (
    <StScriptIndex>
      스크립트 {index + 1}
      {!isOne && <ImageDiv src={icScriptDeleteLight} className="script-delete-btn" layout="fill" alt="x" />}
    </StScriptIndex>
  );
}

export default ScriptIndex;

const StScriptIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16.7rem;
  height: 4.8rem;
  padding: 1rem 2.4rem 1rem 1.6rem;
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};

  .script-delete-btn {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
`;
