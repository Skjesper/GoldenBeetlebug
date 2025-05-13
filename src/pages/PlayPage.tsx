import React, { useState } from 'react';
import RuneHunt from "../components/RuneHunt";
import Window from "../components/Window";
import DuckHunt from '../components/RuneHuntTest';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
          <DuckHunt />
            {/* <RuneHunt onBackgroundChange={setBackgroundImage} /> */}
        </Window>
    );
}
  
export default PlayPage;