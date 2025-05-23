'use client'
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import Link from 'next/link';

const StyledButton = styled.button`
        background-color: var(--secondary);
        color: var(--background);
        border: none;
        font-size: 1.5rem;
        text-decoration: none;
        border-radius: 40px;
        padding: 0.5rem 1.5rem;

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

    if (to) {
        return (
            <Link href={to}>
                <StyledButton disabled={disabled} onClick={onClick}>
                    {children}
                </StyledButton>
            </Link>
        );
    }

    return <StyledButton onClick={onClick} disabled={disabled}>{children}</StyledButton>;
}

export default Button;