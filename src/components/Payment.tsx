import styled from '@emotion/styled';
import Button from './Button';

const PaymentContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 130px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const Input = styled.input`
    width: 264px;
    height: 31px;
    border-radius: 20px;
    border: none;
    margin-bottom: 25px;
    padding-left: 10px;
`;

function Payment() {
    return (
        <PaymentContainer>
            <Title>Rune Hunt</Title>

            <Form>
                <Input type="text" id="username" placeholder="Användarnamn" />
                <Input type="password" id="password" placeholder="Lösenord"/>
            </Form>
            
            <Button to='/runehunt/play'>Betala</Button>

        </PaymentContainer>
    );
}

export default Payment;