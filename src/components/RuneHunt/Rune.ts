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

export class Rune {
    props: RuneProps;

    constructor(props: Partial<RuneProps> = {}) {
        this.props = { ...DEFAULT_RUNE, ...props };
    }

    update(canvasWidth: number, canvasHeight: number) {
        // Hämta egenskaper från this.props
        const { gravity, velocityX, velocityY, radius, x, y } = this.props;
        
        // Remove the damping factor to maintain constant speed
        // const bounceDamping = 0.9; // This was causing speed reduction
        
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
            this.props.velocityX = -velocityX; // Removed damping
            
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
            this.props.velocityY = -newVelocityY; // Removed damping
            
            // Korrigera positionen
            if (newPositionY + radius > canvasHeight) {
                this.props.y = canvasHeight - radius;
            } else if (newPositionY - radius < 0) {
                this.props.y = radius;
            }
        }
    
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { x, y, radius, color } = this.props;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Metod för att kontrollera om en punkt är inuti denna rune (används för klick)
    containsPoint(pointX: number, pointY: number): boolean {
        const dx = pointX - this.props.x;
        const dy = pointY - this.props.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance <= this.props.radius;
    }
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