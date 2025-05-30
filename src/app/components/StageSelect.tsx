'use client'
import styled from '@emotion/styled';
import { useState } from 'react';
import Button from './Button';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--background);
  color: var(--dark);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  padding: 1.5rem;
  box-sizing: border-box;
  position: relative;
`;

const StyledHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h1 {
    margin: 0 0 0.25rem 0;
    font-size: 3rem;

    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    margin: 0 auto;
    font-size: 1.2rem;
    max-width: 90%;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const StyledImageGrid = styled.div`
  width: 90%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  padding-right: 2rem;
  
  @media (max-width: 1024px) {
    width: 95%;
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) and (orientation: landscape) {
    height: 65%;
    gap: 1rem;
  }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5/3;
  border-radius: 20px;
  box-sizing: border-box;
  outline: 2px solid transparent;
  outline-offset: 4px;
  transition: outline-color 0.2s ease;
  
  &:hover {
    outline-color: var(--accent);
  }

  &:hover .overlay{
    opacity: 1;
  }

  &.selected .overlay{
    opacity: 1;
  }
  
  &.selected {
    outline-color: var(--primary);
    outline-width: 3px;
  }
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) and (orientation: landscape) {
    aspect-ratio: 3/2;
  }
`;


const StyledButton = styled(Button)`

  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

`;

const OverlayText = styled.div`
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
`;

interface ImageObject {
    src: string;
    alt: string;
    id: number;
}
  
interface StageSelectProps {
    images: ImageObject[];
    startGame: () => void;
    onStageSelect?: (selectedId: number) => void;
}

export default function StageSelect({ images, startGame, onStageSelect }: StageSelectProps) {
    
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    const handleSelect = (id: number) => {
        setSelectedId(id);
        onStageSelect?.(id);
    };
    
    const isDisabled = selectedId === null;
    
    return (
        <StyledContainer className='selectContainer'>
            <StyledHeader>
                <h1>Välj bana</h1>
                <p>Skjut så många Rune du kan med champagnekorken innan tiden tar slut. Får du över 150p är det en vinst! Men se upp så du inte träffar fel person... </p>
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
                                borderRadius: '20px',
                                objectFit: 'cover'
                            }}
                        />

                        <Overlay className="overlay">
                            <OverlayText className="overlayText">
                              {image.alt}
                            </OverlayText>
                        </Overlay>
                    </StyledImageContainer>
                ))}
            </StyledImageGrid>

            <StyledButton onClick={startGame} disabled={selectedId === null}>Spela</StyledButton>
            

        </StyledContainer>
    );
}