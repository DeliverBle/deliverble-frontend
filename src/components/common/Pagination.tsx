import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  listSize: number;
  blockSize: number;
  currentPage: number;
  lastPage: number;
  handleSearchWithPage: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { blockSize, currentPage, lastPage, handleSearchWithPage } = props;
  const [pageGroupList, setPageGroupList] = useState<number[] | []>([]);

  const sliceIntoChunks = (list: number[], chunkSize: number) => {
    const chunkList = [];
    const length = list.length;
    for (let i = 0; i < length; i += chunkSize) {
      const chunk = list.slice(i, i + chunkSize);
      chunkList.push(chunk);
    }
    return chunkList;
  };

  useEffect(() => {
    const totalPageList = Array.from({ length: lastPage }, (_, i) => i + 1);
    const totalGroupList = sliceIntoChunks(totalPageList, blockSize);
    const index = Math.floor(currentPage / blockSize);

    if (currentPage % blockSize !== 0) {
      setPageGroupList(totalGroupList[index]);
    } else {
      setPageGroupList(totalGroupList[currentPage / blockSize - 1]);
    }
  }, [currentPage, blockSize, lastPage]);

  return (
    <StPagination>
      {lastPage > blockSize && <StDoubleLeftArrowButton onClick={() => currentPage !== 1 && handleSearchWithPage(1)} />}
      <StLeftArrowButton onClick={() => currentPage !== 1 && handleSearchWithPage(currentPage - 1)} />
      {pageGroupList.map((page) => (
        <StNumberButton onClick={() => handleSearchWithPage(page)} isActive={page === currentPage} key={page}>
          {page}
        </StNumberButton>
      ))}
      <StRightArrowButton onClick={() => currentPage !== lastPage && handleSearchWithPage(currentPage + 1)} />
      {lastPage > blockSize && (
        <StDoubleRightArrowButton onClick={() => currentPage !== lastPage && handleSearchWithPage(lastPage)} />
      )}
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
    color: ${COLOR.GRAY_60};
  }
`;
