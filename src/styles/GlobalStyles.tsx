import { Global, css } from '@emotion/react';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');

    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }
;`

function GlobalStyles() {
    return <Global styles={globalStyles} />;
  }
  
  export default GlobalStyles;