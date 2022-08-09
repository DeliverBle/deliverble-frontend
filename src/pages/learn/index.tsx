import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import NewsList from '@src/components/common/NewsList';
import SelectBox from '@src/components/learn/SelectBox';
import ImageDiv from '@src/components/common/ImageDiv';
import Pagination from '@src/components/common/Pagination';
import Footer from '@src/components/common/Footer';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icSearch } from 'public/assets/icons';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';

const channelList = ['전체', 'SBS', 'KBS', 'MBC', '기타'];
const categoryList = ['전체', '정치', '경제', '사회', '세계', '연예', '기타'];
const speakerList = ['전체', '여성', '남성'];

function Learn() {
  const BLOCK_SIZE = 10;
  const LIST_SIZE = 12;
  const [selectedChannelList, setSelectedChannelList] = useState<string[]>([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);
  const [selectedSpeakerList, setSelectedSpeakerList] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultList, setResultList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    const { paging, videoList } = await api.learnService.postSearchCondition({
      channels: selectedChannelList,
      categories: selectedCategoryList,
      announcerGender: selectedSpeakerList,
      currentPage: 1,
      listSize: LIST_SIZE,
    });

    setCurrentPage(1);
    setTotalCount(paging.totalCount);
    setLastPage(paging.lastPage);
    setResultList(videoList);
    setIsLoading(false);
  };

  const handleSearchWithPage = async (page: number) => {
    setIsLoading(true);

    const { paging, videoList } = await api.learnService.postSearchCondition({
      channels: selectedChannelList,
      categories: selectedCategoryList,
      announcerGender: selectedSpeakerList,
      currentPage: page,
      listSize: LIST_SIZE,
    });

    setCurrentPage(page);
    setTotalCount(paging.totalCount);
    setLastPage(paging.lastPage);
    setResultList(videoList);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { paging, videoList } = await api.learnService.postSearchCondition({
        channels: [],
        categories: [],
        announcerGender: [],
        currentPage: 1,
        listSize: LIST_SIZE,
      });
      setTotalCount(paging.totalCount);
      setLastPage(paging.lastPage);
      setResultList(videoList);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
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
          <button onClick={handleSearch}>검색하기</button>
        </StSearch>
        {isLoading ? (
          <VideoListSkeleton itemNumber={12} />
        ) : (
          <StResult>
            <h2>
              전체 <span>{totalCount}개 </span> 영상
            </h2>
            <NewsList newsList={resultList} />
            <Pagination
              listSize={LIST_SIZE}
              blockSize={BLOCK_SIZE}
              currentPage={currentPage}
              lastPage={lastPage}
              handleSearchWithPage={handleSearchWithPage}
            />
          </StResult>
        )}
      </StLearn>
      <Footer />
    </>
  );
}

export default Learn;

const StLearn = styled.div`
  margin: auto 16rem;
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 16rem;
  margin-bottom: 4.8rem;

  .search {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
  }

  & > h1 {
    ${FONT_STYLES.SB_32_HEADLINE};
    color: ${COLOR.BLACK};
  }
`;

const StSearch = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8rem;

  & > button {
    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.B_20_BODY};
    padding: 1.4rem 4rem 1.4rem 3.9rem;
    border-radius: 1.4rem;
    margin-left: 4rem;
    min-width: fit-content;
    height: 5.6rem;
  }
`;

const StSelectBoxContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const StResult = styled.div`
  & > h2 {
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
