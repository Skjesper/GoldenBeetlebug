import React, { useState } from 'react';
import Window from "../components/Window";
import RuneHunt from '../components/RuneHunt';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
            <RuneHunt onBackgroundChange={setBackgroundImage} />
        </Window>
    );
}
  
export default PlayPage;