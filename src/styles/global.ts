import { createGlobalStyle } from 'styled-components';
import { colors } from './tokens';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: 'SF Pro Text', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.47;
    letter-spacing: -0.374px;
    color: ${colors.ink};
    background: ${colors.canvasParchment};
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, select, textarea {
    font-family: inherit;
  }
`;
