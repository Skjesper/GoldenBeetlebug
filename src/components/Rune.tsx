import styled from '@emotion/styled';

type RuneProps = {
    onClick?: () => void;
    bounceHeight: number;
    startPosition: number;
    time: number;
    firstTurn: string;
    secondTurn: string;
    thirdTurn: string;
}


const StyledRune = styled.button<RuneProps>`
width: 60px;
height: 60px;
background-color: hotpink;
animation: bounce ${props => props.time}s infinite;
        
/* @keyframes bounce {
    0%, 100% {
        transform: translateY(0px);
    }
    20% {
        transform: ${props => props.firstTurn}(${props => props.bounceHeight}%);
    }
    40% {
        transform: ${props => props.secondTurn}(${props => props.bounceHeight}%);
    }
    60% {
        transform: ${props => props.thirdTurn}(${props => props.bounceHeight}%);
    }
    70% {
        transform: ${props => props.firstTurn}(${props => props.bounceHeight}%);
    }
    80% {
        transform: ${props => props.secondTurn}(${props => props.bounceHeight}%);
    }
    
} */

    @keyframes bounce {
    0%, 100% {
        transform: translateY(0px);
    }
    20% {
        transform: ${props => props.firstTurn}(200px);
    }
    40% {
        transform: ${props => props.secondTurn}(200px);
    }
    60% {
        transform: ${props => props.thirdTurn}(200px);
    }
    70% {
        transform: ${props => props.firstTurn}(200px);
    }
    80% {
        transform: ${props => props.secondTurn}(200px);
    }
    
}
`;


const Rune = ({ onClick, bounceHeight, startPosition, firstTurn, secondTurn, thirdTurn, time }: RuneProps) => {


    return(
<StyledRune 
onClick={onClick}
bounceHeight={bounceHeight} 
startPosition={startPosition}
time={time}
firstTurn={firstTurn}
secondTurn={secondTurn}
thirdTurn={thirdTurn}
>

</StyledRune>

    )
}

export default Rune;