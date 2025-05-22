import { useState } from 'react';
import GameApp from '../components/GameApp';
import OrientationOverlay from '../components/OrientationCheck/OrientationCheck';

function PlayPage() {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

    return (
        <OrientationOverlay>
            <GameApp onBackgroundChange={setBackgroundImage} />
            // </OrientationOverlay>
    );
}
  
export default PlayPage;