import GameApp from '../components/GameApp';
import OrientationOverlay from '../components/OrientationCheck/OrientationCheck';


function PlayPage() {
    
    return (
<>
        <OrientationOverlay>
            <GameApp/>
        </OrientationOverlay>
</>

    );
}
  
export default PlayPage;