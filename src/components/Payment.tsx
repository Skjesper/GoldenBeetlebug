import styled from '@emotion/styled';
import Button from './Button';

import React from "react";
import { useGameContext } from "../services/GameContext";
import { GAME_CONFIG } from "../services/gameConfig";
import { processPayment } from "../services/transactionService";

const PaymentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding:2rem;
  margin: 0 auto;
 
  display: flex;
  flex-direction: column; 
  /* justify-content: center;  */
  align-items: center; 
  justify-content: center;
  /* height: 100%; */
  background-color: var(--background);
  gap: 1.5rem;
  
`;

const Title = styled.h1`
    font-family: var(--font-primary);
    font-size: clamp(4rem, 10vw, 8rem);
    text-align: center;
    font-weight: 400;
    color: var(--dark);
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


const PaymentSection: React.FC = () => {
  const {
    setHasPaid,
    isProcessing,
    setIsProcessing,
    // paymentError,
    setPaymentError,
    jwtToken,
    inputRef,
  } = useGameContext();

const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      const result = await processPayment(jwtToken);
      console.log("Payment result:", result, "hoho");
      
      if (result.success) {
        setHasPaid(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      } else {
        setPaymentError(result.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

// function Payment() {
    return (
        <PaymentContainer className='paymentContainer'>
            <Title>Rune Hunt</Title>

            <Form className='formContainer'>
                <Input type="text" id="username" placeholder="Användarnamn" />
                <Input type="password" id="password" placeholder="Lösenord"/>
            </Form>
            
            <Button onClick={handlePayment}
        disabled={isProcessing}>Betala</Button>

        </PaymentContainer>
    );
};

export default PaymentSection;