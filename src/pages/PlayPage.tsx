import { useState } from 'react';
import Window from "../components/Window";
import GameApp from '../components/GameApp';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <Window backgroundImage={backgroundImage}>
            <GameApp onBackgroundChange={setBackgroundImage} />
        </Window>
    );
}
  
export default PlayPage;