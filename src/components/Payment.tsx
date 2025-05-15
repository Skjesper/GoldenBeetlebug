import styled from '@emotion/styled';
import Button from './Button';

const PaymentContainer = styled.div`
  max-width: 37.5rem;
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column; 
  /* justify-content: center;  */
  align-items: center; 
  /* height: 100%; */
  
`;

const Title = styled.h1`
  font-size: 8rem;
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
        <PaymentContainer className='paymentContainer'>
            <Title className='title'>Rune Hunt</Title>

            <Form className='formContainer'>
                <Input type="text" id="username" placeholder="Användarnamn" />
                <Input type="password" id="password" placeholder="Lösenord"/>
            </Form>
            
            <Button to='/play'>Betala</Button>

        </PaymentContainer>
    );
}

export default Payment;