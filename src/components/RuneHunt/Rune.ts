export interface RuneProps 

{
    id: number;
    x:  number;
    y:  number;
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
}
