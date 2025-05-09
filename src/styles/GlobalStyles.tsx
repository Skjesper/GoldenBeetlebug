import { Global, css } from '@emotion/react';

const globalStyles = css`
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

    :root {
        --primary: #D31717;
        --secondary: #fff;
        --primary-dark: #901111;
        --text-main: #333;
        --text-light: #B3B2B2;
        --background: #ffffff;
        --error: #e74c3c;

        --font-primary: 'Inter', sans-serif;
        --font-display: 'Instrument Serif', serif;

        /* Font sizes
        --text-xs: 0.75rem;
        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.25rem;
        --text-2xl: 1.5rem;
        --text-3xl: 1.875rem; */
        
        /* Font weights */
        --weight-thin: 100;
        --weight-light: 300;
        --weight-regular: 400;
        --weight-medium: 500;
        --weight-semibold: 600;
        --weight-bold: 700;
        --weight-black: 900;
    }
    
    * {
        font-family: var(--font-primary);
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-display);
        font-weight: var(--weight-bold);
    }

    a {
        text-decoration: none;
    }
    
;`

function GlobalStyles() {
    return <Global styles={globalStyles} />;
  }
  
  export default GlobalStyles;