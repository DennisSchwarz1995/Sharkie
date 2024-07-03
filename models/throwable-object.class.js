class ThrowableObject extends MovableObject {

    constructor(position_x, position_y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.position_x = position_x;
        this.position_y = position_y;
        this.width = 40;
        this.height = 40;
        this.horizontal_distance = 400;
        this.hasStartedRising = false
        this.throwBubble();
    }

    throwBubble(bubbleType) {
        this.speed_y = 12;
        this.speed_x = 20;
        setInterval( () => {
            this.position_x += this.speed_x;

            if (this.position_x >= this.horizontal_distance && !this.hasStartedRising) {
                this.hasStartedRising = true;
            }
            if (this.hasStartedRising) {
                this.position_y -= this.speed_y;
                this.speed_y *= 0.98; 
            }
        }, 50);
    
    }
}