import RuneHunt from "../components/RuneHunt";
import StageSelect from "../components/StageSelect";
import Window from "../components/Window";

import backgroundImage1 from './../assets/backgroundImages/game_background.png'
import backgroundImage2 from './../assets/backgroundImages/dessert_bg.png'
import backgroundImage3 from './../assets/backgroundImages/forest_bg.png'
import backgroundImage4 from './../assets/backgroundImages/winter_bg.png'

function GamePage() {

  const stageImages = [
    {
      id: 1,
      src: backgroundImage1, 
      alt: "Första steget"
    },
    {
      id: 2,
      src: backgroundImage2,
      alt: "Andra steget"
    },
    {
      id: 3,
      src: backgroundImage3,
      alt: "Tredje steget"
    },
    {
      id: 4,
      src: backgroundImage4,
      alt: "Tredje steget"
    }
  ];
  
  return (
    // <Window>
    //   <RuneHunt />
    // </Window>

    <Window>
      <StageSelect images={stageImages}
      />
    </Window>
  );
}
  
  export default GamePage;