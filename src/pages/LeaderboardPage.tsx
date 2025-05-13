import React, { useState } from 'react';
import Window from "../components/Window";
import Leaderboard from '../components/Leaderboard';

function LeaderboardPage() {
    const [backgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
            <Leaderboard/>
        </Window>
    );
}
  
  export default LeaderboardPage;