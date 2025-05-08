import Button from './../components/Button';
import styled from '@emotion/styled';
import Window from '../components/Window';

const ButtonContainer = styled.div`
  margin-bottom: 4rem;
`;


function StartPage() {
  return (
    <>
      <Window>
        <ButtonContainer>
          <Button to="/runesbeachclub">Starta</Button>
        </ButtonContainer>
      </Window>
    </>
  );
}

export default StartPage;

