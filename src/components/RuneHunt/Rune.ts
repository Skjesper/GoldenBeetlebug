// Rune.ts
export interface RuneProps {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    gravity: number;
    velocityX: number;
    velocityY: number;
    isActive: boolean;
    image?: HTMLImageElement;
}

export const DEFAULT_RUNE: RuneProps = {
    id: 0,
    x: 0,
    y: 0,
    radius: 40,
    color: '#3498db',
    gravity: 0.0,    
    velocityX: 2,
    velocityY: 2,
    isActive: true
};

// Image cache to avoid loading the same image multiple times
const imageCache: Record<string, HTMLImageElement> = {};

// We'll set this from RuneHuntGame.tsx
let runeImageSrc: string | null = null;

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
            // Create and load the image if not in cache
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
        // Hämta egenskaper från this.props
        const { gravity, velocityX, velocityY, radius, x, y } = this.props;
        
        // Uppdatera hastighet med gravitation (ska vara 0 i detta fall)
        const newVelocityY = velocityY + gravity;
        this.props.velocityY = newVelocityY;
        
        // Uppdatera position baserat på båda hastighetskomponenterna
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
        const { x, y, radius, color, image } = this.props;

        // Draw the image if it's loaded
        if (image && this.imageLoaded) {
            // Calculate dimensions to properly center the image
            const size = radius * 2;
            ctx.drawImage(
                image,
                x - radius, // Center horizontally
                y - radius, // Center vertically
                size,
                size
            );
        } else {
            // Fall back to drawing a circle if the image isn't loaded
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
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
    
    // Generera en ljus, slumpmässig färg
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 70%, 50%)`;
    
    return new Rune({
        id: Date.now() + Math.random(), 
        x,
        y,
        radius,
        color,
        velocityX: speedX * directionX,
        velocityY: speedY * directionY,
        gravity: 0.0  // Ingen gravitation
    });
}

export default Rune;