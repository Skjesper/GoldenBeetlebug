import Window from '../components/Window';
import Payment from '../components/Payment';
import JwtDisplay from '../services/JwtDisplay';
import { GameProvider } from '../services/GameContext';


function RuneHuntPage() {
  return (
    <>
 <GameProvider>

  <JwtDisplay/> 
      <Window blurred>
     
        <Payment></Payment>
        
      </Window>
 </GameProvider>

    </>
  );
}

export default RuneHuntPage;

