import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import NewsList from '@src/components/common/NewsList';
import SelectBox from '@src/components/learn/SelectBox';
import ImageDiv from '@src/components/common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icSearch } from 'public/assets/icons';
import Footer from '@src/components/common/Footer';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';

function Learn() {
  const channelList = ['전체', 'SBS', 'KBS', 'MBC', '기타'];
  const categoryList = ['전체', '정치', '경제', '사회', '세계', '연예', '기타'];
  const speakerList = ['전체', '여성', '남성'];
  const [totalCount, setTotalCount] = useState(0);
  const [resultList, setResultList] = useState<VideoData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.learnService.postSearchCondition({ currentPage: 1, listSize: 12 });
      setTotalCount(response.paging.totalCount);
      setResultList(response.videoList);
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
            <SelectBox optionName="방송사" optionList={channelList} />
            <SelectBox optionName="분야" optionList={categoryList} />
            <SelectBox optionName="발화자" optionList={speakerList} />
          </StSelectBoxContainer>
          <button>검색하기</button>
        </StSearch>
        <StResult>
          <h2>
            전체 <span>{totalCount}개 </span> 영상
          </h2>
          <NewsList newsList={resultList} />
          <div>페이지네이션</div>
        </StResult>
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
    ${FONT_STYLES.SB_20_BODY};
    color: ${COLOR.GRAY_30};
    margin-bottom: 2.3rem;

    span {
      color: ${COLOR.MAIN_BLUE};
    }
  }

  & > div {
    margin-top: 16rem;
    margin-bottom: 26.4rem;
    text-align: center;
  }
`;
