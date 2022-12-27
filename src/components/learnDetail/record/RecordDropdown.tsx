import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

interface RecordDropdownProps {
  link: string;
}

function RecordDropdown(props: RecordDropdownProps) {
  const { link } = props;

  return (
    <>
      <StRecordDropdown>
        <button>
          <a href={link} download="filename.mp3">
            다운로드
          </a>
        </button>
        <button type="button">이름 바꾸기</button>
        <button type="button">녹음 삭제</button>
      </StRecordDropdown>
    </>
  );
}

export default RecordDropdown;

const StRecordDropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 4.8rem;
  right: 0;
  z-index: 100;

  width: 11.7rem;
  height: 11.6rem;

  border: 0.1rem solid ${COLOR.GRAY_10};
  border-radius: 1.2rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  & > button {
    width: 9.1rem;
    height: 3.2rem;

    border-radius: 0.8rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_16_CAPTION};
  }

  & > button:hover {
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
