import styled from '@emotion/styled';

type RuneProps = {
    onClick?: () => void;
    bounceHeight: number;
    startPosition: number;
    firstTurn: string;
    secondTurn: string;
    thirdTurn: string;
}


const StyledRune = styled.button<RuneProps>`
width: 60px;
height: 60px;
background-color: hotpink;
animation: bounce 2s infinite;
        
@keyframes bounce {
    0%, 100% {
        transform: translateY(${props => props.startPosition}px);
    }
    20% {
        transform: ${props => props.firstTurn}(${props => props.bounceHeight}px);
    }
    40% {
        transform: ${props => props.secondTurn}(${props => props.bounceHeight}px);
    }
    60% {
        transform: ${props => props.thirdTurn}(${props => props.bounceHeight}px);
    }
    70% {
        transform: ${props => props.firstTurn}(${props => props.bounceHeight}px);
    }
    80% {
        transform: ${props => props.secondTurn}(${props => props.bounceHeight}px);
    }
    
}
`;


const Rune = ({ onClick, bounceHeight, startPosition, firstTurn, secondTurn, thirdTurn }: RuneProps) => {


    return(
<StyledRune 
onClick={onClick}
bounceHeight={bounceHeight} 
startPosition={startPosition}
firstTurn={firstTurn}
secondTurn={secondTurn}
thirdTurn={thirdTurn}
>

</StyledRune>

    )
}

export default Rune;