import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icLogoFooter, icSocial } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from './ImageDiv';

function Footer() {
  return (
    <StFooter>
      <StLogo>
        <ImageDiv className="logo" src={icLogoFooter} alt="logo" />
        <h4>
          언제 어디서나 당당한 당신의 말하기를
          <br />
          응원합니다.
        </h4>
      </StLogo>
      <StInfo>
        <StService>
          <StInfoTitle>Service</StInfoTitle>
          <a target="_blank" href="https://forms.gle/BGQGeGBLXTM6RBCR7" rel="noreferrer">
            <StUnderlineText>서비스 피드백</StUnderlineText>
          </a>
        </StService>
        <StPeople>
          <StInfoTitle>People</StInfoTitle>
          <a target="_blank" href="https://airy-fang-202.notion.site/b2c4031ba1424e66840ddbad3432a8c5" rel="noreferrer">
            <StUnderlineText>딜리버블을 만든 사람들</StUnderlineText>
          </a>
        </StPeople>
        <StContact>
          <StInfoTitle>Contact Us</StInfoTitle>
          <p>deliverble.team@gmail.com</p>
        </StContact>
        <StSocial>
          <StInfoTitle>Social</StInfoTitle>
          <a target="_blank" href="https://www.instagram.com/deliverble_official/" rel="noreferrer">
            <ImageDiv className="social-link" src={icSocial} alt="instagram" />
          </a>
        </StSocial>
      </StInfo>
    </StFooter>
  );
}

export default Footer;

const StFooter = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 40rem;

  background-color: ${COLOR.GRAY_5};

  p {
    margin-top: 1.6rem;

    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_20_BODY}
  }
`;

const StLogo = styled.div`
  padding: 12.6rem 0 12.6rem 16rem;

  & > h4 {
    margin-top: 1.6rem;

    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_24_HEADLINE}
  }
`;

const StInfoTitle = styled.h6`
  color: ${COLOR.GRAY_30};
  ${FONT_STYLES.SB_24_HEADLINE}
`;

const StInfo = styled.div`
  display: flex;
`;

const StUnderlineText = styled.p`
  text-decoration-line: underline;
`;

const StService = styled.div`
  padding: 15.1rem 11.7rem 0 0;
`;

const StPeople = styled.div`
  padding: 15.1rem 10.1em 0 0;
`;

const StContact = styled.div`
  padding: 15.1rem 9.4rem 0 0;
`;

const StSocial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15.1rem 18rem 0 0;

  & > a {
    margin-top: 1.6rem;
  }
`;
