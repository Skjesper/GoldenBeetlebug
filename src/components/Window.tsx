import styled from '@emotion/styled';
import Background from './Background';
import type { ReactNode } from 'react';

interface WindowProps {
    children: ReactNode;
    blurred?: boolean;
    backgroundImage?: string;
  }

  const WindowContainer = styled.div`
  position: relative;
  /* width: 100%; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1.5rem;
  
  @media (max-width: 1024px) {
    padding: 0;
    
  } 
`;


function Window({ children }: WindowProps) {
    return (
      <WindowContainer className='windowContainer'>
       
          {children}
        
      </WindowContainer>
    );
  }

export default Window;