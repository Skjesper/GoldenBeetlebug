'use client'
import React from "react";
import styled from '@emotion/styled';
import Button from './Button';
import AnimatedTarget from './AnimatedTarget';
import { useGameContext } from "../services/useGameContext";
import { processPayment } from "../services/transactionService";

const PaymentContainer = styled.div`
  width: 100%;
  height: 100vh;
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
    padding-bottom: 50px;
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

const PaymentSection: React.FC = () => {
  const targetImagePath = '/assets/TargetIcon.png';
  
  const {
    setHasPaid,
    isProcessing,
    setIsProcessing,
    setPaymentError,
    jwtToken,
    inputRef,
  } = useGameContext();

const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      const result = await processPayment(jwtToken);
      console.log(result.success);
      
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
    return (
      
        <PaymentContainer className='paymentContainer'>
            <TitleWrapper>
                <Title>Rune Hunt</Title>
                <OverlayTarget>
                    <AnimatedTarget targetImagePath={targetImagePath} />
                </OverlayTarget>
            </TitleWrapper>
            
            <Button to='/play' onClick={handlePayment}
        disabled={isProcessing}>Betala €7</Button>

        </PaymentContainer>
    );
};

export default PaymentSection;