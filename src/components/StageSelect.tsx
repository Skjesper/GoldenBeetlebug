
import styled from '@emotion/styled';
import  { useState } from 'react';
import Button from './Button';

const StyledContainer = styled.div`
width: 100%;
height: 100%;
background-color: #8ec28e;
color: #173d25;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 1rem;
`;

const StyledImageGrid = styled.div`
width: 70%;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 4rem;
margin-top: 2rem;
`;

const StyledImageContainer = styled.div`
    width: 20rem;
    height: 12rem;
    overflow: hidden;
    box-sizing: border-box;
    outline: 1px solid transparent;
    padding:2px;
    

    &:hover {
        outline-color: hotpink;
        }
    
    &.selected {
        outline: 4px solid gold;
        
    }
    

`;

interface ImageObject {
    src: string;
    alt: string;
    id: number;
  }
  
interface StageSelectProps {
images: ImageObject[];
}


export default function StageSelect({ images }: StageSelectProps) {
    
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    const handleSelect = (id: number) => {
    setSelectedId(id);
    };

    return (
        <>
        
        <StyledContainer>
            <h1>Välj bana</h1>
            <p>Info om hur du spelar, varför du spelar, hur du vinner, varför du aldrig kommer vinna och hur vi ska tjäna alla pengar. Hej och hå, kämpa på!</p>
            <StyledImageGrid>

        {images.map((image) => (      
        <StyledImageContainer 
            key={image.id} 
            onClick={() => handleSelect(image.id)}
            className={selectedId === image.id ? "selected" : ""}
>
        <img 
          key={image.id}
          src={image.src}
          alt={image.alt}
          style={{ 
            width: '100%',
            height: '100%', 
            borderRadius: '1rem',
            
          }}
          
          />
          </StyledImageContainer>
      ))}

      </StyledImageGrid>
      <Button to='/runehunt/play'>Spela</Button>
          </StyledContainer>
     
      </>
    );
}
