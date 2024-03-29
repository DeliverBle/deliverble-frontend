import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { COLOR } from '@src/styles';

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  html,
  body {
    width: 100%;
    height: 100%;
  }

  #__next {
    height: 100%;
  }

  #root {
    margin: 0 auto;
  }

  html {
    font-size: 62.5%;
  }
  
  * {
    box-sizing: border-box;
  }

  body, button, textarea, input {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  body {
    @media (max-width: 1919px) {
      zoom: 67%;
    }

    @media (min-width: 1920px) {
      zoom: 100%;
    }
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    -webkit-tap-highlight-color : transparent;
  }

  a {
    text-decoration: none;
    color: ${COLOR.BLACK};
  }

  input {
    outline: none; 
  }

  @font-face {
    font-family: 'Dongle';
    font-display: swap;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Bold.woff') format('woff');
  }
`;

export default GlobalStyle;
