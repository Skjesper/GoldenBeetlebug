
import Window from '../components/Window';
import Payment from '../components/Payment';
import { GameProvider } from '../services/gameContext';


function RuneHuntPage() {
  return (
    <>
 <GameProvider>

      <Window blurred>
     
        <Payment></Payment>
        
      </Window>
 </GameProvider>

    </>
  );
}

export default RuneHuntPage;

