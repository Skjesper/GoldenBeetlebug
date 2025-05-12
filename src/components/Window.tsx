import styled from '@emotion/styled';
import Background from './Background';
import type { ReactNode } from 'react';

interface WindowProps {
    children: ReactNode;
    blurred?: boolean;
  }

  const WindowContainer = styled.div`
  /* position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  
  @media (max-width: 1024px) {
    padding: 0;
    height: 100vh;
  } */
`;


function Window({ children, blurred = false }: WindowProps) {
    return (
      <WindowContainer className='windowContainer'>
        <Background blurred ={blurred}>
          {children}
        </Background>
      </WindowContainer>
    );
  }

export default Window;