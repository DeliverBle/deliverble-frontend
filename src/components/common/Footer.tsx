import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icLogoFooter, icSocial } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from './ImageDiv';

function Footer() {
  return (
    <StFooter>
      <StLogo>
        <ImageDiv src={icLogoFooter} alt="logo" />
      </StLogo>
      <StInfo>
        <StService>
          <h6>Service</h6>
          <a target="_blank" href="/" rel="noreferrer">
            <p>서비스 피드백</p>
          </a>
        </StService>
        <StPeople>
          <h6>People</h6>
          <a target="_blank" href="/" rel="noreferrer">
            <p>서비스를 만든 사람들</p>
          </a>
        </StPeople>
        <StContact>
          <h6>Contact Us</h6>
          <p>deliverble.team@gmail.com</p>
        </StContact>
        <StSocial>
          <h6>Social</h6>
          <a target="_blank" href="/" rel="noreferrer">
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

  h6 {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_24_HEADLINE}
  }

  p {
    margin-top: 1.6rem;

    color: ${COLOR.GRAY_60};
    ${FONT_STYLES.M_20_BODY}
  }
`;

const StLogo = styled.div`
  padding: 12.6rem 0 12.6rem 16rem;
`;

const StInfo = styled.div`
  display: flex;
`;

const StService = styled.div`
  padding: 15.1rem 11.7rem 0 0;

  p {
    line-height: 20px;
    border-bottom: 2.3px solid ${COLOR.GRAY_60};
  }
`;

const StPeople = styled.div`
  padding: 15.1rem 10.1em 0 0;

  p {
    line-height: 20px;
    border-bottom: 2.3px solid ${COLOR.GRAY_60};
  }
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
