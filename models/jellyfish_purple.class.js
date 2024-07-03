class JellyFish_Purple extends MovableObject {
    MOTION_IMAGES = [
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
  
    constructor(position_x, position_y) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImagesForMotion(this.MOTION_IMAGES);
        this.width = 80;
        this.height = 80;
        this.offset.top = 6;
        this.offset.bottom = 10;
        this.position_x = position_x;
        this.position_y = position_y;
        this.direction_y = 'down';
        this.animate();
      }

      animate() {
        setInterval(() => {
          this.playAnimation(this.MOTION_IMAGES);
        }, 150);

        setInterval(() => {
          this.updateVerticalMovement();
        }, 100);
      }
  }