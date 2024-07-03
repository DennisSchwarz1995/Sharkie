class Light extends MovableObject {
    position_y = 0;
    height = 400;
    width = 600;



   constructor() {
    super().loadImage('img/3. Background/Layers/1. Light/1.png');
    this.position_x = Math.random() * 100;
    }

}