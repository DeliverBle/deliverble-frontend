import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  listSize: number;
  blockSize: number;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { blockSize, currentPage, lastPage, onPageChange } = props;
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
    setPageGroupList(totalGroupList[currentPage % blockSize ? index : index - 1]);
  }, [currentPage, blockSize, lastPage]);

  return (
    <StPagination role="navigation" aria-label="페이지 탐색">
      {lastPage > blockSize && (
        <StArrowButton aria-label="첫 페이지로 이동" disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          {'<<'}
        </StArrowButton>
      )}
      <StArrowButton
        aria-label="이전 페이지로 이동"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        {'<'}
      </StArrowButton>
      {pageGroupList.map((page) => (
        <StNumberButton
          aria-current={page === currentPage && 'page'}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
          key={page}>
          {page} <span>페이지</span>
        </StNumberButton>
      ))}
      <StArrowButton
        aria-label="다음 페이지로 이동"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}>
        {'>'}
      </StArrowButton>
      {lastPage > blockSize && (
        <StArrowButton
          aria-label="마지막 페이지로 이동"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(lastPage)}>
          {'>>'}
        </StArrowButton>
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
  padding: 0;
  ${FONT_STYLES.SB_20_BODY};
  color: ${COLOR.GRAY_30};

  :disabled {
    cursor: not-allowed;
  }

  :hover {
    color: ${COLOR.GRAY_45};
  }

  :active {
    color: ${COLOR.BLACK};
  }
`;

const StNumberButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_20_BODY};

  :hover {
    color: ${COLOR.GRAY_45};
  }

  span {
    display: none;
  }
`;
