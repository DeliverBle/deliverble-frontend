import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icDoubleLeftArrow, icDoubleRightArrow, icLeftArrow, icRightArrow } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from './ImageDiv';

interface PaginationProps {
  listSize: number;
  blockSize: number;
  currentPage: number;
  lastPage: number;
  handleSearchWithPage: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { listSize, blockSize, currentPage, lastPage, handleSearchWithPage } = props;
  console.log(listSize); // 12
  console.log(blockSize); // 10
  const pageList = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <StPagination>
      <ImageDiv className="arrow" src={icDoubleLeftArrow} layout="fill" alt="<<" />
      <ImageDiv className="arrow" src={icLeftArrow} layout="fill" alt="<" />
      {pageList.map((page) => (
        <StButton onClick={() => handleSearchWithPage(page)} isActive={page === currentPage} key={page}>
          {page}
        </StButton>
      ))}
      <ImageDiv className="arrow" src={icRightArrow} layout="fill" alt=">" />
      <ImageDiv className="arrow" src={icDoubleRightArrow} layout="fill" alt=">>" />
    </StPagination>
  );
}

export default Pagination;

const StPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  .arrow {
    position: relative;
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
  }
`;

const StButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_20_BODY};

  &:hover {
    color: ${COLOR.BLACK};
  }
`;
