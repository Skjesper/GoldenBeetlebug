'use client'
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import Link from 'next/link';

const StyledButton = styled.button`
        background-color: var(--secondary);
        color: var(--background);
        border: none;
        display: flex;
        height: 44px;
        padding: 10px 32px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        align-self: stretch;
        aspect-ratio: 31/11;
        border-radius: 40px;
        text-decoration: none;
        font-size: 20px;
        font-weight: 400;
        font-family: var(--font-secondary);


        &:hover {
            background-color: var(--primary);
        }

        &:disabled {
            background-color: var(--disabled);
        }

        @media (orientation: portrait) {
            display: none;
        }  
`;

type ButtonProps = {
    children: ReactNode;
    to?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: string
    
}

function Button({ children, to, onClick, disabled }: ButtonProps) {

    if (disabled) {
        return <StyledButton disabled>{children}</StyledButton>;
    }
    if (to) {
        return (
            <Link href={to} passHref legacyBehavior>
                <StyledButton as="a">{children}</StyledButton>
            </Link>
        );
    }

    return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

{/* <Button to="/"></Button>
<Button to="/resultat"></Button>
<Button to="/runesbeachclub"></Button> */}

export default Button;