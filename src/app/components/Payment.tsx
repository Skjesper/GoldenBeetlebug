import styled from '@emotion/styled';
import Button from './Button';
import AnimatedTarget from './AnimatedTarget';

const PaymentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding:2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  background-color: var(--background);
  gap: 1.5rem;
  border-radius: 20px;
`;

const Title = styled.h1`
    font-family: var(--font-primary);
    font-size: clamp(4rem, 10vw, 8rem);
    text-align: center;
    font-weight: 400;
    color: var(--dark);
`;

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const OverlayTarget = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; 
`;

function Payment() {
    const targetImagePath = '/assets/TargetIcon.png';

    return (
        <PaymentContainer>
            <TitleWrapper>
                <Title>Rune Hunt</Title>
                <OverlayTarget>
                    <AnimatedTarget targetImagePath={targetImagePath} />
                </OverlayTarget>
            </TitleWrapper>
            
            <Button to='/play'>Betala</Button>
        </PaymentContainer>
    );
}

export default Payment;