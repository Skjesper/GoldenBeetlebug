import styled from '@emotion/styled';

type RuneProps = {
    onClick?: () => void;
}


const StyledRune = styled.button`
width: 60px;
height: 60px;
background-color: hotpink;
animation: bounce 2s infinite;
        
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-100px);
    }
}
`;


const Rune = ({ onClick }: RuneProps) => {


    return(
<StyledRune onClick={onClick}></StyledRune>

    )
}

export default Rune;