import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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

    if (disabled) {
        return <StyledButton disabled>{children}</StyledButton>;
    }
    if (to) {
        return (
            <Link to={to}>
                <StyledButton>{children}</StyledButton>
            </Link>
        );
    }

    return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

{/* <Button to="/"></Button>
<Button to="/resultat"></Button>
<Button to="/runesbeachclub"></Button> */}

export default Button;