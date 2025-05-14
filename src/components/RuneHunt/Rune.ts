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
    gravity: 0.2, 
    velocityX: 2,
    velocityY: 2,
    isActive: true
};

export class Rune {
    props: RuneProps;

    constructor(props: Partial<RuneProps> = {}) {
        this.props = { ...DEFAULT_RUNE, ...props };
    }

    update(canvasHeight: number) {
        const gravity = this.props.gravity;
        const currentVelocity = this.props.velocityY;
        const ballRadius = this.props.radius;
        const ballCenterY = this.props.y;
        const bounceDamping = 0.8; 
        
        const newVelocity = currentVelocity + gravity;
        this.props.velocityY = newVelocity;
        
        const newPositionY = ballCenterY + newVelocity;
        this.props.y = newPositionY;
        
        const ballBottomEdge = newPositionY + ballRadius;
        const isBallHittingBottom = ballBottomEdge > canvasHeight;

        if (isBallHittingBottom) {
            const correctedPositionY = canvasHeight - ballRadius;
            this.props.y = correctedPositionY;
            
            const bounceVelocity = -newVelocity * bounceDamping;
            this.props.velocityY = bounceVelocity;
        }
        
        const ballTopEdge = newPositionY - ballRadius;
        const isBallHittingTop = ballTopEdge < 0;
        
        if (isBallHittingTop) {
            const correctedPositionY = ballRadius;
            this.props.y = correctedPositionY;
            
            const bounceVelocity = -newVelocity * bounceDamping;
            this.props.velocityY = bounceVelocity;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const centerX = this.props.x;
        const centerY = this.props.y;
        const radius = this.props.radius;
        const ballColor = this.props.color;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
    }
}
    
export function createRune(x: number, y: number, radius: number = 20, color: string = '#3498db'): Rune {  // Ändrat returtyp från Ball till Rune
    return new Rune({
        x,
        y,
        radius,
        color
    });
}
      
export default Rune;