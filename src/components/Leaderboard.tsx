import styled from "@emotion/styled";

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    width: 44.25rem;
    height: 20.625rem;
    border-radius: 20px;
`;

const Title = styled.h1 `
    font-size: 4rem;
`;

const ListContainer = styled.ol `
    font-family: var(--font-display);
`;

const ListItem = styled.li `
    font-family: var(--font-display);
    font-size: 2rem;
    text-decoration: 0.8px black underline;
`;

function Leaderboard() {
    return (
        <>
            <Container>
                <Title>Leaderboard</Title>
                <ListContainer>
                    <ListItem>
                        <span>Anna Dahlberg </span>
                        <span>200</span>
                    </ListItem>
                </ListContainer>
            </Container>
        </>
    )
}

export default Leaderboard;