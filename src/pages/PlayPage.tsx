import React, { useState } from 'react';
import RuneHunt from "../components/RuneHunt";
import Window from "../components/Window";
import DuckHunt from '../components/RuneHuntTest';
import RuneHuntGame from '../components/RuneHunt/RuneHuntGame';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
          <RuneHuntGame></RuneHuntGame>
            {/* <RuneHunt onBackgroundChange={setBackgroundImage} /> */}
        </Window>
    );
}
  
export default PlayPage;