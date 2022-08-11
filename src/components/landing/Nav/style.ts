import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import styled from 'styled-components';

export const StNav = styled.nav<{ isSecondScrolled: boolean }>`
  display: flex;
  gap: 160rem;
  position: fixed;
  z-index: 1;

  width: 100%;
  height: 8.8rem;

  background: ${({ isSecondScrolled }) => isSecondScrolled && COLOR.WHITE};

  .logo {
    position: relative;
    width: 14rem;
    height: 5.6rem;

    top: 1.6rem;
    left: 6.4rem;
  }
`;

export const StLogin = styled.button<{ isFirstScrolled: boolean }>`
  position: fixed;
  margin-top: 2.9rem;
  right: 6.4rem;
  ${FONT_STYLES.SB_20_BODY};
  color: ${({ isFirstScrolled }) => (isFirstScrolled ? COLOR.MAIN_BLUE : COLOR.WHITE)};
`;
