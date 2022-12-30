import { css } from 'styled-components';

type Font = {
  size: number;
  weight: 'R' | 'SB' | 'M' | 'B' | 'L';
  position: 'Headline' | 'Body' | 'Caption' | 'Footer' | 'Memo';
  height: number;
};

const getFontWeight = (weight: Font['weight']) => {
  switch (weight) {
    case 'M':
      return 500;
    case 'SB':
      return 600;
    case 'B':
      return 700;
    case 'L':
      return 300;
    case 'R':
    default:
      return 400;
  }
};

export const FONT = ({ size, weight, height }: Font) => css`
  font-size: ${size}px;
  font-weight: ${getFontWeight(weight)};
  letter-spacing: -0.01em;
  line-height: ${height}%;
`;

export const FONT_STYLES = {
  M_44_HEADLINE: FONT({ size: 44, weight: 'M', position: 'Headline', height: 150 }),
  SB_44_HEADLINE: FONT({ size: 44, weight: 'SB', position: 'Headline', height: 130 }),
  SB_36_HEADLINE: FONT({ size: 36, weight: 'SB', position: 'Headline', height: 140 }),
  SB_32_HEADLINE: FONT({ size: 32, weight: 'SB', position: 'Headline', height: 150 }),
  B_32_HEADLINE: FONT({ size: 32, weight: 'B', position: 'Headline', height: 140 }),
  SB_28_HEADLINE: FONT({ size: 28, weight: 'SB', position: 'Headline', height: 140 }),
  M_28_HEADLINE: FONT({ size: 28, weight: 'M', position: 'Headline', height: 140 }),
  SB_24_HEADLINE: FONT({ size: 24, weight: 'SB', position: 'Headline', height: 140 }),
  M_24_HEADLINE: FONT({ size: 24, weight: 'M', position: 'Headline', height: 140 }),
  L_24_HEADLINE: FONT({ size: 24, weight: 'L', position: 'Headline', height: 140 }),
  B_22_HEADLINE: FONT({ size: 22, weight: 'B', position: 'Headline', height: 140 }),
  SB_21_BODY: FONT({ size: 21, weight: 'SB', position: 'Body', height: 140 }),
  M_21_BODY: FONT({ size: 21, weight: 'M', position: 'Body', height: 140 }),
  B_20_BODY: FONT({ size: 20, weight: 'B', position: 'Body', height: 140 }),
  SB_20_BODY: FONT({ size: 20, weight: 'SB', position: 'Body', height: 140 }),
  M_20_BODY: FONT({ size: 20, weight: 'M', position: 'Body', height: 140 }),
  M_25_BODY: FONT({ size: 25, weight: 'M', position: 'Body', height: 140 }),
  R_20_BODY: FONT({ size: 20, weight: 'R', position: 'Body', height: 180 }),
  SB_18_CAPTION: FONT({ size: 18, weight: 'SB', position: 'Caption', height: 140 }),
  M_18_CAPTION: FONT({ size: 18, weight: 'M', position: 'Caption', height: 140 }),
  R_18_CAPTION: FONT({ size: 18, weight: 'R', position: 'Caption', height: 150 }),
  R_17_CAPTION: FONT({ size: 17, weight: 'R', position: 'Caption', height: 150 }),
  SB_16_CAPTION: FONT({ size: 16, weight: 'SB', position: 'Caption', height: 140 }),
  M_16_CAPTION: FONT({ size: 16, weight: 'M', position: 'Caption', height: 140 }),
  M_15_CAPTION: FONT({ size: 15, weight: 'M', position: 'Caption', height: 140 }),
  SB_12_CAPTION: FONT({ size: 12, weight: 'SB', position: 'Caption', height: 140 }),
  B_100_CAPTION: FONT({ size: 100, weight: 'B', position: 'Caption', height: 140 }),
  SB_25_MEMO: FONT({ size: 25, weight: 'SB', position: 'Memo', height: 140 }),
  R_23_MEMO: FONT({ size: 23, weight: 'R', position: 'Memo', height: 160 }),
  SB_24_FOOTER: FONT({ size: 24, weight: 'SB', position: 'Footer', height: 140 }),
  M_24_FOOTER: FONT({ size: 24, weight: 'M', position: 'Footer', height: 140 }),
  SB_15_CAPTION: FONT({ size: 15, weight: 'SB', position: 'Caption', height: 140 }),
};
