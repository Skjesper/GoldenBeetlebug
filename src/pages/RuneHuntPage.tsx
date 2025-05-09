import Button from '../components/Button';
import styled from '@emotion/styled';
import Window from '../components/Window';

const ButtonContainer = styled.div`
  margin-bottom: 4rem;
  z-index: 100;
`;


function RuneHuntPage() {
  return (
    <>
      <Window blurred>
        <ButtonContainer>
          <Button to="/runehunt/play">Starta</Button>
        </ButtonContainer>
      </Window>
    </>
  );
}

export default RuneHuntPage;

