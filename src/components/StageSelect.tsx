import styled from '@emotion/styled';
import { useState } from 'react';
import Button from './Button';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #8ec28e;
  color: #173d25;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  
  h1 {
    margin: 0 0 0.25rem 0;
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    max-width: 90%;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const StyledImageGrid = styled.div`
  width: 90%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-gap: 1.5rem;
  overflow-y: auto;
  margin: 0.5rem 0;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); 
    grid-gap: 1rem;
    width: 95%;
  }
  
  @media (max-width: 768px) and (orientation: landscape) {
    grid-template-columns: repeat(2, 1fr); 
    grid-gap: 0.75rem;
    height: 65%;
  }
`;

const StyledImageContainer = styled.div`
  aspect-ratio: 5/3; 
  box-sizing: border-box;
  outline: 1px solid transparent;
  padding: 1px;
  max-width: 100%;
  
  &:hover {
    outline-color: hotpink;
  }
  
  &.selected {
    outline: 3px solid gold;
  }
  
  @media (max-width: 768px) and (orientation: landscape) {
    aspect-ratio: 3/2;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface ImageObject {
    src: string;
    alt: string;
    id: number;
}
  
interface StageSelectProps {
    images: ImageObject[];
    startGame: () => void;
}

export default function StageSelect({ images, startGame }: StageSelectProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    const handleSelect = (id: number) => {
        setSelectedId(id);
    };

    return (
        <StyledContainer className='selectContainer'>
            <StyledHeader>
                <h1>Välj bana</h1>
                <p>Info om hur du spelar, varför du spelar, hur du vinner, varför du aldrig kommer vinna och hur vi ska tjäna alla pengar.</p>
            </StyledHeader>
            
            <StyledImageGrid className='styledImageGrid'>
                {images.map((image) => (      
                    <StyledImageContainer 
                        key={image.id} 
                        onClick={() => handleSelect(image.id)}
                        className={selectedId === image.id ? "selected" : ""}
                    >
                        <img 
                            src={image.src}
                            alt={image.alt}
                            style={{ 
                                width: '100%',
                                height: '100%', 
                                borderRadius: '0.5rem',
                                objectFit: 'cover'
                            }}
                        />
                    </StyledImageContainer>
                ))}
            </StyledImageGrid>
            
            <StyledButton onClick={startGame}>Spela</StyledButton>
        </StyledContainer>
    );
}