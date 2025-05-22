import { useState } from 'react';
import Window from "../components/Window";
import GameApp from '../components/GameApp';
import { GameProvider } from '../services/GameContext';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
<GameProvider>
        <Window backgroundImage={backgroundImage}>
            <GameApp onBackgroundChange={setBackgroundImage} />
        </Window>
</GameProvider>
    );
}
  
export default PlayPage;