import styled from '@emotion/styled';
import backgroundImage from './../assets/backgroundImages/game_background.png'


const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  @media (orientation: landscape) {
    background: #c76565;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    filter: blur(1px);
  }
`;

function Background() {
    return (
        <BackgroundDiv></BackgroundDiv>
    );
  };
  
  export default Background;