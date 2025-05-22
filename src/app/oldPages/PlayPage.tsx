import { useState } from 'react';
import GameApp from '../components/GameApp';

import { GameProvider } from '../services/GameContext';

import OrientationOverlay from '../components/OrientationCheck/OrientationCheck';


function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (

<GameProvider>
        <Window backgroundImage={backgroundImage}>
            <GameApp onBackgroundChange={setBackgroundImage} />
        </Window>
</GameProvider>

        <OrientationOverlay>
            <GameApp onBackgroundChange={setBackgroundImage} />
            // </OrientationOverlay>

    );
}
  
export default PlayPage;