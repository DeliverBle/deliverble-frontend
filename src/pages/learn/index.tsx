import NavigationBar from '@src/components/common/NavigationBar';
import Footer from '@src/components/common/Footer';
import ImageDiv from '@src/components/common/ImageDiv';
import NewsList from '@src/components/common/NewsList';
import Pagination from '@src/components/common/Pagination';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import SelectBox from '@src/components/learn/SelectBox';
import { api } from '@src/services/api';
import { PostSearchConditionRequestBody, VideoData } from '@src/services/api/types/learn';
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { BLOCK_SIZE, categoryList, channelList, LIST_SIZE, speakerList } from '@src/utils/constant';
import { icSearch } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useRouter } from 'next/router';

function Learn() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [selectedChannelList, setSelectedChannelList] = useState<string[]>([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);
  const [selectedSpeakerList, setSelectedSpeakerList] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultList, setResultList] = useState<VideoData[]>([]);

  const { mutate, isLoading } = useMutation(
    async (requestBody: PostSearchConditionRequestBody) => {
      return isLoggedIn
        ? await api.learnService.postSearchConditionWithToken(requestBody)
        : await api.learnService.postSearchConditionWithoutToken(requestBody);
    },
    {
      onSuccess: (data) => {
        const { paging, videoList } = data;
        setTotalCount(paging.totalCount);
        setLastPage(paging.lastPage);
        setResultList(videoList);
      },
      onError: () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.reload();
        return;
      },
    },
  );

  const handlePageChange = (page: number) => {
    mutate({
      channel: selectedChannelList,
      category: selectedCategoryList,
      announcerGender: selectedSpeakerList,
      currentPage: page,
      listSize: LIST_SIZE,
    });
    setCurrentPage(page);
  };

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);

    setResultList((prev) => {
      return prev.map((news) => {
        if (news.id === likeId) {
          return {
            ...news,
            isFavorite,
          };
        }
        return news;
      });
    });
  };

  useEffect(() => {
    mutate({
      channel: selectedChannelList,
      category: selectedCategoryList,
      announcerGender: selectedSpeakerList,
      currentPage: 1,
      listSize: LIST_SIZE,
    });
    setCurrentPage(1);
  }, [mutate, selectedCategoryList, selectedChannelList, selectedSpeakerList]);

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
          <VideoListSkeleton itemNumber={12} haveCountSection={true} />
        ) : (
          <StResult>
            <h2>
              전체 <span>{totalCount}개 </span> 영상
            </h2>
            <NewsList newsList={resultList} onClickLike={handleClickLike} type="normal" />
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
      <Footer />
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
