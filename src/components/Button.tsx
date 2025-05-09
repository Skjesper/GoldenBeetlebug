import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
        background-color: #ea0b0b;
        color: #ffffff;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        width: fit-content;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;

        &:hover {
            background-color: #48b300;
        }

        @media (orientation: portrait) {
            display: none;
        }  
`;

type ButtonProps = {
    children: ReactNode;
    to?: string;
    onClick?: () => void;
}

function Button({ children, to, onClick }: ButtonProps) {
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