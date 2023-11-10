import {createGlobalStyle} from "styled-components";
/*import {MyTheme} from "./MyTheme.styles";*/

export const GlobalStyles=createGlobalStyle`


  
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Tinos', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  *:focus-visible {
    outline: 3px solid greenyellow;
  }
    
@media (prefers-reduced-motion: reduce) {
  animation:unset;
}
  
`