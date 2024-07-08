class PoisonBottle extends MovableObject {
  MOTION_IMAGES = [
    'img/4. Marcadores/Posión/Animada/1.png',
    'img/4. Marcadores/Posión/Animada/2.png',
    'img/4. Marcadores/Posión/Animada/3.png',
    'img/4. Marcadores/Posión/Animada/4.png',
    'img/4. Marcadores/Posión/Animada/5.png',
    'img/4. Marcadores/Posión/Animada/6.png',
    'img/4. Marcadores/Posión/Animada/7.png',
    'img/4. Marcadores/Posión/Animada/8.png',
  ];

  constructor(position_x) {
    super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.position_x = position_x;
    this.height = 80;
    this.width = 50;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
        this.playAnimation(this.MOTION_IMAGES);
    }, 100)
  }
}
