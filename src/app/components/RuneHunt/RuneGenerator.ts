'use client'
import Rune from './Rune';

interface RuneConfig {
  minMargin: number;
  minRadius: number;
  maxRadius: number;
  minSpeed: number;
  maxSpeed: number;
}

interface BadRuneConfig {
  spawnInterval: number;
  spawnChance: number;
  lifetime: number;
  sizeMultiplier: number;
}

const CONFIGS = {
  desktop: {
    minMargin: 50,
    minRadius: 30,
    maxRadius: 45,
    minSpeed: 3,
    maxSpeed: 6
  },
  mobile: {
    minMargin: 20,
    minRadius: 25,
    maxRadius: 35,
    minSpeed: 2.0,
    maxSpeed: 4.5
  }
} as const;

const BAD_RUNE_CONFIG: BadRuneConfig = {
  spawnInterval: 1000,    // 1 sekund
  spawnChance: 0.5,       // 50% chans
  lifetime: 5000,         // 5 sekunder
  sizeMultiplier: 1.4     // 40% större
};

export class RuneGenerator {
  private gameWidth: number;
  private gameHeight: number;
  private config: RuneConfig;
  private badRuneConfig: BadRuneConfig;
  private badRuneInterval: number | null = null;
  private onBadRuneSpawn?: (badRune: Rune) => void;

  constructor(gameWidth: number, gameHeight: number, isMobile: boolean = false) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.config = isMobile ? CONFIGS.mobile : CONFIGS.desktop;
    this.badRuneConfig = BAD_RUNE_CONFIG;
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

  // Ställ in callback för när bad runes skapas
  setBadRuneSpawnCallback(callback: (badRune: Rune) => void): void {
    this.onBadRuneSpawn = callback;
  }

  // Starta bad rune timer
  startBadRuneSpawning(): void {
    if (this.badRuneInterval) return; // Redan igång

    const checkSpawn = () => {
      if (Math.random() < this.badRuneConfig.spawnChance && this.onBadRuneSpawn) {
        const badRune = this.createBadRune();
        this.onBadRuneSpawn(badRune);
      }
    };

    this.badRuneInterval = window.setInterval(checkSpawn, this.badRuneConfig.spawnInterval);
  }

  // Stoppa bad rune timer
  stopBadRuneSpawning(): void {
    if (this.badRuneInterval) {
      clearInterval(this.badRuneInterval);
      this.badRuneInterval = null;
    }
  }

  // Kontrollera om bad runes ska tas bort baserat på ålder
  filterExpiredBadRunes(runes: Rune[]): Rune[] {
    const currentTime = Date.now();
    return runes.filter(rune => {
      if (!rune.props.isBad || !rune.props.createdAt || !rune.props.lifeTime) return true;
      return currentTime - rune.props.createdAt < rune.props.lifeTime;
    });
  }

  private createBaseRune(isBad: boolean = false): Rune {
    const { minMargin, minRadius, maxRadius, minSpeed, maxSpeed } = this.config;

    const randomX = minMargin + Math.random() * (this.gameWidth - 2 * minMargin);
    const randomY = minMargin + Math.random() * (this.gameHeight - 2 * minMargin);

    let radius = minRadius + Math.random() * (maxRadius - minRadius);
    const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;

    if (isBad) {
      radius *= this.badRuneConfig.sizeMultiplier;
    }

    return new Rune({
      id: Date.now() + Math.random(),
      x: randomX,
      y: randomY,
      radius,
      velocityX: speedX * directionX,
      velocityY: speedY * directionY,
      gravity: 0.0,
      isBad,
      createdAt: isBad ? Date.now() : undefined,
      lifeTime: isBad ? this.badRuneConfig.lifetime : undefined
    });
  }

  createRegularRune(): Rune {
    return this.createBaseRune(false);
  }

  createBadRune(): Rune {
    return this.createBaseRune(true);
  }

  createInitialRunes(numRunes: number): Rune[] {
    return Array.from({ length: numRunes }, () => this.createRegularRune());
  }

  ensureRegularRunes(currentRunes: Rune[], targetNumber: number): Rune[] {
    // Räkna bara vanliga runer
    const regularRunes = currentRunes.filter(rune => !rune.props.isBad);
    
    if (regularRunes.length >= targetNumber) return currentRunes;

    const numToAdd = targetNumber - regularRunes.length;
    const newRunes = Array.from({ length: numToAdd }, () => this.createRegularRune());

    return [...currentRunes, ...newRunes];
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

  // Cleanup method
  cleanup(): void {
    this.stopBadRuneSpawning();
  }
}

export default RuneGenerator;