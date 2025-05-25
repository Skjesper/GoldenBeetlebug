'use client'
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
    minSpeed: 3,
    maxSpeed: 4
  },
  mobile: {
    minMargin: 20,
    minRadius: 25,  
    maxRadius: 35,  
    minSpeed: 2.0,
    maxSpeed: 3.0,
  }
} as const;

export class RuneGenerator {
  private gameWidth: number;
  private gameHeight: number;
  private config: RuneConfig;
  private maxBadRunes: number;
  
  constructor(gameWidth: number, gameHeight: number, isMobile: boolean = false, maxBadRunes: number = 3) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.config = isMobile ? CONFIGS.mobile : CONFIGS.desktop;
    this.maxBadRunes = maxBadRunes;
  }
  
  updateSettings(settings: { 
    gameWidth?: number, 
    gameHeight?: number, 
    isMobile?: boolean,
    maxBadRunes?: number 
  }): void {
    if (settings.gameWidth !== undefined) this.gameWidth = settings.gameWidth;
    if (settings.gameHeight !== undefined) this.gameHeight = settings.gameHeight;
    if (settings.isMobile !== undefined) this.config = settings.isMobile ? CONFIGS.mobile : CONFIGS.desktop;
    if (settings.maxBadRunes !== undefined) this.maxBadRunes = settings.maxBadRunes;
  }
  
  setDeviceType(isMobile: boolean): void {
    this.updateSettings({ isMobile });
  }
  
  updateGameSize(width: number, height: number): void {
    this.updateSettings({ gameWidth: width, gameHeight: height });
  }
  
  setMaxBadRunes(max: number): void {
    this.maxBadRunes = max;
  }
  
  private countBadRunes(runes: Rune[]): number {
    return runes.filter(rune => rune.props.isBad).length;
  }
  
  createRandomRune(isBad = false): Rune {
    const { minMargin, minRadius, maxRadius, minSpeed, maxSpeed } = this.config;

    const randomX = minMargin + Math.random() * (this.gameWidth - 2 * minMargin);
    const randomY = minMargin + Math.random() * (this.gameHeight - 2 * minMargin);
    
    let radius = minRadius + Math.random() * (maxRadius - minRadius);
    
    const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    if (isBad) {
      radius *= 1.4;
    }

    return new Rune({
      id: Date.now() + Math.random(), 
      x: randomX,
      y: randomY,
      radius,     
      velocityX: speedX * directionX,
      velocityY: speedY * directionY,
      gravity: 0.0,
      isBad
    });
  }
  
  createNewRune(badRuneRatio: number = 0.2, existingRunes: Rune[] = []): Rune {
    const currentBadCount = this.countBadRunes(existingRunes);
    
    if (currentBadCount >= this.maxBadRunes) {
      return this.createRandomRune(false);
    }
    
    const shouldBeBad = Math.random() < badRuneRatio;
    return this.createRandomRune(shouldBeBad);
  }

  createInitialRunes(numRunes: number, badRuneRatio: number = 0.2): Rune[] {
    const runes: Rune[] = [];
    
    for (let i = 0; i < numRunes; i++) {
      const newRune = this.createNewRune(badRuneRatio, runes);
      runes.push(newRune);
    }
    
    return runes;
  }
  
  ensureRunes(currentRunes: Rune[], targetNumber: number, badRuneRatio: number = 0.2): Rune[] {
    if (currentRunes.length >= targetNumber) return currentRunes;
    
    const numToAdd = targetNumber - currentRunes.length;
    const newRunes: Rune[] = [];
    
    for (let i = 0; i < numToAdd; i++) {
      const allRunes = [...currentRunes, ...newRunes];
      const newRune = this.createNewRune(badRuneRatio, allRunes);
      newRunes.push(newRune);
    }
    
    return [...currentRunes, ...newRunes];
  }
  
  getBadRuneStats(runes: Rune[]): { count: number, max: number, canCreateMore: boolean } {
    const count = this.countBadRunes(runes);
    return {
      count,
      max: this.maxBadRunes,
      canCreateMore: count < this.maxBadRunes
    };
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