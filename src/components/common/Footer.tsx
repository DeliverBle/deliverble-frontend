import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icDeliverbleBlue, icSocial } from 'public/assets/icons';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import ImageDiv from './ImageDiv';

function Footer() {
  const is500 = useMediaQuery({
    query: '(max-width: 500px)',
  });

  return (
    <StFooter>
      <StLogo>
        <ImageDiv className="logo" src={icDeliverbleBlue} alt="딜리버블" />
        <h4>
          언제 어디서나 당당할 당신의 {is500 && <br />}말하기를{!is500 && <br />} 딜리버블이 응원합니다.
        </h4>
      </StLogo>
      <StInfo>
        <StFeedback>
          <StInfoTitle>Feedback</StInfoTitle>
          <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer">
            <StUnderlineText>서비스 피드백</StUnderlineText>
          </a>
        </StFeedback>
        <StService>
          <StInfoTitle>Service</StInfoTitle>
          <a
            target="_blank"
            href="https://airy-fang-202.notion.site/DeliverBle-42f2392a86714b02b369e7cb1c3e7dd9"
            rel="noreferrer">
            <StUnderlineText>딜리버블 서비스 소개</StUnderlineText>
          </a>
        </StService>
        <StContact>
          <StInfoTitle>Contact Us</StInfoTitle>
          <p>deliverble.team@gmail.com</p>
        </StContact>
        <StSocial>
          <StInfoTitle>Social</StInfoTitle>
          <a target="_blank" href="https://www.instagram.com/deliverble_official/" rel="noreferrer">
            <ImageDiv className="social-link" src={icSocial} alt="인스타그램 링크" />
          </a>
        </StSocial>
      </StInfo>
    </StFooter>
  );
}

export default Footer;

const StFooter = styled.div`
  display: grid;
  grid-template-columns: 3.7fr 6.2fr;
  justify-content: space-between;

  width: 100%;
  height: 40rem;
  padding: 12.4rem 0rem 13.1rem 16rem;
  background-color: ${COLOR.GRAY_5};

  p {
    margin-top: 1.6rem;
    color: ${COLOR.GRAY_60};
  }

  @media (max-width: 960px) {
    display: block;
    padding: 10rem 0rem 0rem 8.6rem;
    height: 53.4rem;
  }

  @media (max-width: 500px) {
    display: block;
    padding: 8rem 0rem 8rem 2.4rem;
    height: 79.5rem;
  }
`;

const StLogo = styled.div`
  .logo {
    height: 6rem;
  }

  & > h4 {
    margin-top: 1.6rem;
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  @media (max-width: 500px) {
    .logo {
      width: 12rem;
      height: 3.7rem;
    }

    & > h4 {
      ${FONT_STYLES.SB_21_BODY};
    }
  }
`;

const StInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 2.6fr 3.1fr 2.1fr;
  padding-top: 2.6rem;

  @media (max-width: 960px) {
    padding-top: 9.6rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 4.8rem;
    padding-top: 6.4rem;
    height: 46rem;
  }
`;

const StInfoTitle = styled.div`
  color: ${COLOR.GRAY_30};
  ${FONT_STYLES.SB_24_HEADLINE};
`;

const StUnderlineText = styled.p`
  ${FONT_STYLES.SB_20_FOOTER};
  text-decoration-line: underline;
  text-underline-position: under;
`;

const StFeedback = styled.div`
  min-width: 10.8rem;
`;

const StService = styled.div`
  min-width: 18.1rem;
`;

const StContact = styled.div`
  min-width: 24.7rem;
  ${FONT_STYLES.M_20_FOOTER};
`;

const StSocial = styled.div`
  width: 6.6rem;

  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.6rem;
  }

  @media (max-width: 500px) {
    & > a {
      align-items: start;
    }
  }
`;
