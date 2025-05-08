import styled from '@emotion/styled';
import Background from './Background';
import type { ReactNode } from 'react';

interface WindowProps {
    children: ReactNode;
    blurred?: boolean;
  }

const WindowContainer = styled.div`
position: relative;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
padding: 20px;
`;


function Window({ children, blurred = false }: WindowProps) {
    return (
      <WindowContainer>
        <Background blurred ={blurred}>
          {children}
        </Background>
      </WindowContainer>
    );
  }

export default Window;