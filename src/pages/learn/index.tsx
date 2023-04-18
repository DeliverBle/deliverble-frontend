import { Footer, ImageDiv, NavigationBar, NewsList, Pagination, SEO, VideoListSkeleton } from '@src/components/common';
import { SelectBox } from '@src/components/learn';
import { BLOCK_SIZE, LIST_SIZE } from '@src/constants/common';
import { categoryList, channelList, speakerList } from '@src/constants/learn';
import { COLOR, FONT_STYLES } from '@src/styles';
import { icSearch } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePostLikeData } from '@src/services/queries/common';
import { useGetSearchCondition, usePostSearchCondition } from '@src/services/queries/learn';
import { queryClient } from '@src/pages/_app';

function Learn() {
  const [selectedChannelList, setSelectedChannelList] = useState<string[]>([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);
  const [selectedSpeakerList, setSelectedSpeakerList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchCondition = {
    channel: selectedChannelList,
    category: selectedCategoryList,
    announcerGender: selectedSpeakerList,
    currentPage,
    listSize: LIST_SIZE,
  };

  const { data, isLoading } = useGetSearchCondition(searchCondition);
  const { mutate } = usePostSearchCondition();
  const resultList = data?.videoList ?? [];
  const totalCount = data?.paging.totalCount ?? 0;
  const lastPage = data?.paging.lastPage ?? 1;
  const postLikeData = usePostLikeData();
  const hasCachedData = queryClient.getQueryData(['postSearchCondition', searchCondition]);

  const mutateSearchCondition = (page: number) => {
    mutate({ ...searchCondition, currentPage: page });
    setCurrentPage(page);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    mutateSearchCondition(page);
  };

  useEffect(() => {
    !hasCachedData && mutateSearchCondition(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryList, selectedChannelList, selectedSpeakerList]);

  return (
    <StPageWrapper>
      <SEO title="학습하기 | Deliverble" />
      <NavigationBar />
      <StLearn>
        <StTitle>
          <ImageDiv src={icSearch} className="search" layout="fill" alt="" />
          <h1>원하는 영상을 찾아 쉐도잉 해보세요!</h1>
        </StTitle>
        <StSearch>
          <StSelectBoxContainer>
            <SelectBox optionName="방송사" optionList={channelList} setConditionList={setSelectedChannelList} />
            <SelectBox optionName="분야" optionList={categoryList} setConditionList={setSelectedCategoryList} />
            <SelectBox optionName="발화자" optionList={speakerList} setConditionList={setSelectedSpeakerList} />
          </StSelectBoxContainer>
        </StSearch>
        {isLoading ? (
          <VideoListSkeleton itemNumber={12} hasCountSection />
        ) : (
          <StResult>
            {totalCount > 0 && (
              <h2>
                전체 <span>{totalCount}개 </span> 영상
              </h2>
            )}
            <NewsList newsList={resultList} onClickLike={postLikeData.mutate} type="normal" />
            <Pagination
              listSize={LIST_SIZE}
              blockSize={BLOCK_SIZE}
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={handlePageChange}
            />
          </StResult>
        )}
      </StLearn>
      {resultList.length > 0 && <Footer />}
    </StPageWrapper>
  );
}

export default Learn;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StLearn = styled.div`
  flex: 1;
  margin: auto 16rem;

  @media (max-width: 960px) {
    margin: auto 8.6rem;
  }

  @media (max-width: 500px) {
    margin: auto 2.4rem;
  }
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 24.8rem;
  margin-bottom: 4.8rem;

  .search {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }

  h1 {
    ${FONT_STYLES.SB_32_HEADLINE};
    color: ${COLOR.BLACK};
  }
`;

const StSearch = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8rem;
`;

const StSelectBoxContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const StResult = styled.div`
  h2 {
    ${FONT_STYLES.M_20_BODY};
    color: ${COLOR.GRAY_30};
    margin-bottom: 2.3rem;

    span {
      color: ${COLOR.MAIN_BLUE};
      font-weight: 600;
    }
  }

  & > div {
    margin-top: 16rem;
    margin-bottom: 26.4rem;
    text-align: center;
  }
`;
