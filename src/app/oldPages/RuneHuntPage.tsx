
import OrientationOverlay from '../components/OrientationCheck/OrientationCheck';
import Payment from '../components/Payment';
import JwtDisplay from '../services/JwtDisplay';
import { GameProvider } from '../services/GameContext';


function RuneHuntPage() {
  return (
    <>


  <JwtDisplay/> 
  <OrientationOverlay>
     
        <Payment></Payment>
        
      </OrientationOverlay>
   


    </>
  );
}

export default RuneHuntPage;

