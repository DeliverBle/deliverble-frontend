import { COLOR, FONT_STYLES } from '@src/styles';
import { icDeliverbleBlue, icSocial } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from './ImageDiv';

function Footer() {
  return (
    <StFooter>
      <StLogo>
        <ImageDiv className="logo" src={icDeliverbleBlue} alt="딜리버블" layout="fill" />
        <p>
          언제 어디서나 당당할 당신의 말하기를
          <br />
          딜리버블이 응원합니다.
        </p>
        <a target="_blank" href="https://www.instagram.com/deliverble_official/" rel="noreferrer noopener">
          <ImageDiv className="social-link" src={icSocial} alt="인스타그램 링크" />
        </a>
      </StLogo>
      <StInfo>
        <StService>
          <StInfoTitle>Service</StInfoTitle>
          <a
            target="_blank"
            href="https://airy-fang-202.notion.site/DeliverBle-0b7935fb736246d5a7cdfec64a804e97"
            rel="noreferrer noopener">
            <StUnderlineText>서비스 소개</StUnderlineText>
          </a>
        </StService>
        <StFeedback>
          <StInfoTitle>Feedback</StInfoTitle>
          <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer noopener">
            <StUnderlineText>서비스 피드백</StUnderlineText>
          </a>
        </StFeedback>
        <StContact>
          <StInfoTitle>Contact Us</StInfoTitle>
          <p>deliverble.team@gmail.com</p>
        </StContact>
      </StInfo>
    </StFooter>
  );
}

export default Footer;

const StFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 15rem;

  width: 100%;
  height: 40rem;
  padding: 8.8rem 16rem 17.2rem 16rem;
  background-color: ${COLOR.GRAY_5};

  p {
    margin-top: 1.6rem;
    color: ${COLOR.GRAY_60};
  }

  @media (max-width: 960px) {
    gap: 0;
    padding: 8.8rem 8.6rem 7.7rem 8.6rem;
    p {
      margin-top: 0.4rem;
    }
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 7.8rem 7.5rem 8.4rem 7.4rem;
    height: 79.5rem;

    text-align: center;
  }
`;

const StLogo = styled.div`
  display: flex;
  flex-direction: column;
  height: 21.8rem;

  .logo {
    position: relative;
    width: 17.3rem;
    height: 4.6rem;
  }

  p {
    margin: 1.6rem 0 5.6rem 0;
    min-width: 35.1rem;
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_24_HEADLINE};
    white-space: pre-line;
  }

  a {
    width: fit-content;
  }

  @media (max-width: 500px) {
    align-items: center;
  }
`;

const StInfo = styled.div`
  display: grid;
  padding-top: 2.6rem;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3.2rem;
    padding-top: 0;
    text-align: right;
  }

  @media (max-width: 500px) {
    align-items: center;
    gap: 2.8rem;
    padding-top: 6.4rem;
    text-align: center;
  }
`;

const StInfoTitle = styled.div`
  color: ${COLOR.GRAY_30};
  ${FONT_STYLES.SB_24_HEADLINE};

  @media (max-width: 960px) {
    ${FONT_STYLES.SB_18_CAPTION};
  }
`;

const StUnderlineText = styled.p`
  ${FONT_STYLES.SB_24_FOOTER};
  text-decoration-line: underline;
  text-underline-position: under;
`;

const StService = styled.div`
  min-width: fit-content;
  width: fit-content;
`;

const StFeedback = styled.div`
  min-width: fit-content;
  width: fit-content;
`;

const StContact = styled.div`
  min-width: fit-content;
  ${FONT_STYLES.M_24_FOOTER};
`;
