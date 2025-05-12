import React, { useState } from 'react';
import RuneHunt from "../components/RuneHunt";
import Window from "../components/Window";

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
            <RuneHunt onBackgroundChange={setBackgroundImage} />
        </Window>
    );
}
  
export default PlayPage;