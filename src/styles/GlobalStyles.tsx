import { Global, css } from '@emotion/react';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

    :root {
        --primary: #2960f8;
        --secondary: #fff;
        --text-main: #333;
        --text-light: #767676;
        --background: #ffffff;
        --error: #e74c3c;

        --font-primary: 'Inter', sans-serif;
        --font-display: 'Playfair Display', serif;

        /* Font sizes */
        --text-xs: 0.75rem;
        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.25rem;
        --text-2xl: 1.5rem;
        --text-3xl: 1.875rem;
        
        /* Font weights */
        --weight-thin: 100;
        --weight-light: 300;
        --weight-regular: 400;
        --weight-medium: 500;
        --weight-semibold: 600;
        --weight-bold: 700;
        --weight-black: 900;
    }
    
    html {
        font-family: var(--font-primary);
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-display);
        font-weight: var(--weight-bold);
  
    }

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