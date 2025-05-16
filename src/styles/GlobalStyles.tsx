import { Global, css } from '@emotion/react';

const globalStyles = css`
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@100..900&family=Encode+Sans:wght@100..900&family=Hachi+Maru+Pop&display=swap');

    :root {
        --primary: #C5301D;
        --secondary: #FA7E2B;
        --accent: #5F9422;
        --dark: #300E0A;
        --background: #FFFAF1;
        --error: #e74c3c;

        --font-primary: 'Hachi Maru Pop', sans-serif;
        --font-secondary: 'Encode Sans', serif;
        --font-secondary-big: 'Encode Sans SC', serif;

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

    h1 {
        font-family: var(--font-primary);
    }
    
    h2, h3, h4, h5, h6 {
        font-family: var(--font-secondary);
        font-weight: var(--weight-regular);
    }

    a {
        text-decoration: none;
    }
    
;`

function GlobalStyles() {
    return <Global styles={globalStyles} />;
  }
  
  export default GlobalStyles;