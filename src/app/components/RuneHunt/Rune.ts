export interface RuneProps {
    id: number;
    x: number;
    y: number;
    radius: number;
    gravity: number;
    velocityX: number;
    velocityY: number;
    isActive: boolean;
    createdAt?: number;
    lifeTime?: number;
    isBad?: boolean;
    image?: HTMLImageElement;
}

export const DEFAULT_RUNE: RuneProps = {
    id: 0,
    x: 0,
    y: 0,
    radius: 40,
    gravity: 0.0,    
    velocityX: 2,
    velocityY: 2,
    isActive: true
};

// Image cache to avoid loading the same image multiple times
const imageCache: Record<string, HTMLImageElement> = {};

// We'll set this from RuneHuntGame.tsx
let runeImageSrc: string | null = null;

// This makes it possible to have two different runes for good runes
let runeImageSource1: HTMLImageElement | null = null;
let runeImageSource2: HTMLImageElement | null = null;

// Bad rune images (Hans)
let badRuneImageSource1: HTMLImageElement | null = null;
let badRuneImageSource2: HTMLImageElement | null = null;

let currentImageIndex = 0;
let lastSwitchTime = 0;
const SWITCH_INTERVAL = 500; 

export function setRuneImageSources(goodImage1: string, goodImage2: string, badImage1: string, badImage2: string) {
  // Load good rune images
  runeImageSource1 = new Image();
  runeImageSource1.src = goodImage1;

  runeImageSource2 = new Image();
  runeImageSource2.src = goodImage2;

  // Load bad rune images (Hans)
  badRuneImageSource1 = new Image();
  badRuneImageSource1.src = badImage1;

  badRuneImageSource2 = new Image();
  badRuneImageSource2.src = badImage2;
}

export class Rune {
    props: RuneProps;
    imageLoaded: boolean = false;
    
    constructor(props: Partial<RuneProps> = {}) {
        this.props = { ...DEFAULT_RUNE, ...props };
        this.loadImage();
    }
    
    // Load the rune image
    loadImage() {
        if (!runeImageSrc || this.imageLoaded) return;
        
        if (!imageCache[runeImageSrc]) {
            
            const img = new Image();
            img.src = runeImageSrc;
            img.onload = () => {
                imageCache[runeImageSrc!] = img;
                this.props.image = img;
                this.imageLoaded = true;
            };
            img.onerror = (err) => {
                console.error("Failed to load rune image:", err);
            };
        } else {
            // Use the cached image
            this.props.image = imageCache[runeImageSrc];
            this.imageLoaded = true;
        }
    }

    update(canvasWidth: number, canvasHeight: number) {
       
        const { gravity, velocityX, velocityY, radius, x, y } = this.props;
        
        
        const newVelocityY = velocityY + gravity;
        this.props.velocityY = newVelocityY;
        
        
        const newPositionX = x + velocityX;
        const newPositionY = y + newVelocityY;
        
        this.props.x = newPositionX;
        this.props.y = newPositionY;
        
        // Kontrollera kollision med höger/vänster vägg
        if (newPositionX + radius > canvasWidth || newPositionX - radius < 0) {
            // Vänd X-hastigheten utan att ändra hastigheten
            this.props.velocityX = -velocityX;
            
            // Korrigera positionen
            if (newPositionX + radius > canvasWidth) {
                this.props.x = canvasWidth - radius;
            } else if (newPositionX - radius < 0) {
                this.props.x = radius;
            }
        }
        
        // Kontrollera kollision med topp/botten
        if (newPositionY + radius > canvasHeight || newPositionY - radius < 0) {
            // Vänd Y-hastigheten utan att ändra hastigheten
            this.props.velocityY = -newVelocityY;
            
            // Korrigera positionen
            if (newPositionY + radius > canvasHeight) {
                this.props.y = canvasHeight - radius;
            } else if (newPositionY - radius < 0) {
                this.props.y = radius;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const currentTime = Date.now();
        
        // Rune animation switching logic
        if (currentTime - lastSwitchTime > SWITCH_INTERVAL) {
            currentImageIndex = currentImageIndex === 0 ? 1 : 0;
            lastSwitchTime = currentTime;
        }
        
        // Välj rätt bilder baserat på om det är en bad rune eller inte
        let currentImage: HTMLImageElement | null = null;
        
        if (this.props.isBad) {
            // Bad rune (Hans) - växla mellan Happy och Mad
            currentImage = currentImageIndex === 0 ? badRuneImageSource1 : badRuneImageSource2;
        } else {
            // Good rune - växla mellan Alive och Dead
            currentImage = currentImageIndex === 0 ? runeImageSource1 : runeImageSource2;
        }
        
        if (currentImage) {
            // Spara canvas-tillstånd innan vi ritar
            ctx.save();
            
            // Rita bilden
            ctx.drawImage(
                currentImage,
                this.props.x - this.props.radius,
                this.props.y - this.props.radius,
                this.props.radius * 2,
                this.props.radius * 2
            );
            
            // Återställ canvas-tillståndet
            ctx.restore();
        } else {
            // Fallback rendering om bilderna inte har laddats än
            ctx.fillStyle = this.props.isBad ? '#ff0000' : '#00ff00';
            ctx.beginPath();
            ctx.arc(this.props.x, this.props.y, this.props.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Metod för att kontrollera om en punkt är inuti denna rune (används för klick)
    containsPoint(pointX: number, pointY: number): boolean {
        const dx = pointX - this.props.x;
        const dy = pointY - this.props.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance <= this.props.radius;
    }
}

// Use this function to set the image source
export function setRuneImageSource(src: string) {
    runeImageSrc = src;
}

// Skapa en rune med slumpmässig hastighet och färg
export function createRandomRune(
    x: number, 
    y: number, 
    minRadius = 20, 
    maxRadius = 50,
    minSpeed = 4,
    maxSpeed = 10,
): Rune {
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    
    const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
    
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    return new Rune({
        id: Date.now() + Math.random(), 
        x,
        y,
        radius,
        velocityX: speedX * directionX,
        velocityY: speedY * directionY,
        gravity: 0.0  // Ingen gravitation
    });
}

export default Rune;