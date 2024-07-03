class Water extends MovableObject {
    height = 480;
    width = 720;
    MOTION_IMAGES = [
        'img/3. Background/Layers/5. Water/D1.png',
        'img/3. Background/Layers/5. Water/D2.png'
    ];

    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
        this.position_y = 480 - this.height;
        this.loadImagesForMotion(this.MOTION_IMAGES);
    }

}

