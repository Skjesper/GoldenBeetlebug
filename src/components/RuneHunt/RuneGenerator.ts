// RuneGenerator.ts
import Rune from './Rune';

// Konfigurationsinterface för runor
interface RuneConfig {
  minMargin: number;      // Minsta avstånd från kanten (px)
  minRadius: number;      // Minsta storlek på runor (px)
  maxRadius: number;      // Största storlek på runor (px)
  minSpeed: number;       // Minsta hastighet (px/frame)
  maxSpeed: number;       // Högsta hastighet (px/frame)
}

// Desktop-konfiguration - större, snabbare runor
const DESKTOP_CONFIG: RuneConfig = {
  minMargin: 50,          // 50px margin från kanterna
  minRadius: 25,          // Runor mellan 25-45px i radie
  maxRadius: 45,
  minSpeed: 1.5,          // Hastighet mellan 1.5-3 pixlar per frame
  maxSpeed: 3.0
};

// Mobil-konfiguration - mindre, långsammare runor
const MOBILE_CONFIG: RuneConfig = {
  minMargin: 20,          // 20px margin från kanterna
  minRadius: 15,          // Runor mellan 15-25px i radie 
  maxRadius: 25,
  minSpeed: 1.0,          // Hastighet mellan 1.0-2.0 pixlar per frame
  maxSpeed: 2.0
};

export class RuneGenerator {
  private gameWidth: number;
  private gameHeight: number;
  private config: RuneConfig;
  
  constructor(gameWidth: number, gameHeight: number, isMobile: boolean = false) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // Välj konfiguration baserat på enhetstyp
    this.config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  }
  
  // Om enhetstypen ändras under spelets gång
  setDeviceType(isMobile: boolean): void {
    this.config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  }
  
  // Uppdatera spelstorleken om den ändras
  updateGameSize(width: number, height: number): void {
    this.gameWidth = width;
    this.gameHeight = height;
  }
  
  createRandomRune(): Rune {
    const { minMargin, minRadius, maxRadius, minSpeed, maxSpeed } = this.config;
    
    // Beräkna slumpmässig position
    const randomX = minMargin + Math.random() * (this.gameWidth - 2 * minMargin);
    const randomY = minMargin + Math.random() * (this.gameHeight - 2 * minMargin);
    
    // Slumpmässig storlek
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    
    // Slumpmässig hastighet
    const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
    
    // Slumpmässig riktning
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    // Slumpmässig färg
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 70%, 50%)`;
    
    return new Rune({
      id: Date.now() + Math.random(), 
      x: randomX,
      y: randomY,
      radius,
      color,
      velocityX: speedX * directionX,
      velocityY: speedY * directionY,
      gravity: 0.0
    });
  }
  
  // Skapa initiala runor
  createInitialRunes(numRunes: number): Rune[] {
    const runes: Rune[] = [];
    for (let i = 0; i < numRunes; i++) {
      runes.push(this.createRandomRune());
    }
    return runes;
  }
  
  // Säkerställ att det finns tillräckligt med runor
  ensureRunes(currentRunes: Rune[], targetNumber: number): Rune[] {
    const newRunes = [...currentRunes];
    while (newRunes.length < targetNumber) {
      newRunes.push(this.createRandomRune());
    }
    return newRunes;
  }
  
  // Justera runor för att passa inom canvas
  adjustRunesToFitCanvas(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.props.x < rune.props.radius) {
        rune.props.x = rune.props.radius + 10;
      } else if (rune.props.x > this.gameWidth - rune.props.radius) {
        rune.props.x = this.gameWidth - rune.props.radius - 10;
      }
      
      if (rune.props.y < rune.props.radius) {
        rune.props.y = rune.props.radius + 10;
      } else if (rune.props.y > this.gameHeight - rune.props.radius) {
        rune.props.y = this.gameHeight - rune.props.radius - 10;
      }
    });
  }
}

export default RuneGenerator;