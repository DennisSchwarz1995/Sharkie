class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;

    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
        this.position_y = 480 - this.height;
    }


}