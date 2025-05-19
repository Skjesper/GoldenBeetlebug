
import Rune from './Rune';

interface RuneConfig {
  minMargin: number;
  minRadius: number;
  maxRadius: number;
  minSpeed: number;
  maxSpeed: number;
}

const CONFIGS = {
    desktop: {
      minMargin: 50,
      minRadius: 30,  
      maxRadius: 45,
      minSpeed: 1.8,
      maxSpeed: 3.4
    },
    mobile: {
      minMargin: 20,
      minRadius: 25,  
      maxRadius: 38,  
      minSpeed: 1.4,
      maxSpeed: 2.5
    }
  } as const;

export class RuneGenerator {
  private gameWidth: number;
  private gameHeight: number;
  private config: RuneConfig;
  
  constructor(gameWidth: number, gameHeight: number, isMobile: boolean = false) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.config = isMobile ? CONFIGS.mobile : CONFIGS.desktop;
  }
  
  
  updateSettings(settings: { gameWidth?: number, gameHeight?: number, isMobile?: boolean }): void {
    if (settings.gameWidth !== undefined) this.gameWidth = settings.gameWidth;
    if (settings.gameHeight !== undefined) this.gameHeight = settings.gameHeight;
    if (settings.isMobile !== undefined) this.config = settings.isMobile ? CONFIGS.mobile : CONFIGS.desktop;
  }
  
  
  setDeviceType(isMobile: boolean): void {
    this.updateSettings({ isMobile });
  }
  
  updateGameSize(width: number, height: number): void {
    this.updateSettings({ gameWidth: width, gameHeight: height });
  }
  
  createRandomRune(): Rune {
    const { minMargin, minRadius, maxRadius, minSpeed, maxSpeed } = this.config;

    const randomX = minMargin + Math.random() * (this.gameWidth - 2 * minMargin);
    const randomY = minMargin + Math.random() * (this.gameHeight - 2 * minMargin);
    
    
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    

    const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    return new Rune({
      id: Date.now() + Math.random(), 
      x: randomX,
      y: randomY,
      radius,     
      velocityX: speedX * directionX,
      velocityY: speedY * directionY,
      gravity: 0.0
    });
  }
  

  createInitialRunes(numRunes: number): Rune[] {
    return Array.from({ length: numRunes }, () => this.createRandomRune());
  }
  
  ensureRunes(currentRunes: Rune[], targetNumber: number): Rune[] {
    if (currentRunes.length >= targetNumber) return currentRunes;
    
    return [
      ...currentRunes,
      ...this.createInitialRunes(targetNumber - currentRunes.length)
    ];
  }
  
  adjustRunesToFitCanvas(runes: Rune[]): void {
    const adjustPosition = (pos: number, radius: number, max: number): number => {
      const padding = 10;
      if (pos < radius) return radius + padding;
      if (pos > max - radius) return max - radius - padding;
      return pos;
    };
    
    runes.forEach(rune => {
      rune.props.x = adjustPosition(rune.props.x, rune.props.radius, this.gameWidth);
      rune.props.y = adjustPosition(rune.props.y, rune.props.radius, this.gameHeight);
    });
  }
}

export default RuneGenerator;