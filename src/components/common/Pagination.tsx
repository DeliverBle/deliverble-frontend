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
      {lastPage > blockSize && <StDoubleLeftArrowButton />}
      <StLeftArrowButton />
      {pageList.map((page) => (
        <StNumberButton onClick={() => handleSearchWithPage(page)} isActive={page === currentPage} key={page}>
          {page}
        </StNumberButton>
      ))}
      <StRightArrowButton />
      {lastPage > blockSize && <StDoubleRightArrowButton />}
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

const StArrowButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
`;

const StLeftArrowButton = styled(StArrowButton)`
  background-image: url('/assets/icons/ic_left_arrow.svg');
  &:hover {
    background-image: url('/assets/icons/ic_left_arrow_hover.svg');
  }
`;

const StRightArrowButton = styled(StArrowButton)`
  background-image: url('/assets/icons/ic_right_arrow.svg');
  &:hover {
    background-image: url('/assets/icons/ic_right_arrow_hover.svg');
  }
`;

const StDoubleLeftArrowButton = styled(StArrowButton)`
  background-image: url('/assets/icons/ic_double_left_arrow.svg');
  &:hover {
    background-image: url('/assets/icons/ic_double_left_arrow_hover.svg');
  }
`;

const StDoubleRightArrowButton = styled(StArrowButton)`
  background-image: url('/assets/icons/ic_double_right_arrow.svg');
  &:hover {
    background-image: url('/assets/icons/ic_double_right_arrow_hover.svg');
  }
`;

const StNumberButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_20_BODY};

  &:hover {
    color: ${COLOR.BLACK};
  }
`;
