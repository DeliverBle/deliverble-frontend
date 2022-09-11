import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

interface ScriptIndexProps {
  index: number;
}

function ScriptIndex(props: ScriptIndexProps) {
  const { index } = props;
  return <StScriptIndex>스크립트 {index + 1}</StScriptIndex>;
}

export default ScriptIndex;

const StScriptIndex = styled.div`
  width: 16.7rem;
  height: 4.8rem;
  padding: 1rem 0;
  padding-left: 2.4rem;
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
