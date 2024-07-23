class PoisonBottle extends AnimationObject {
  /**
   * Creates an instance of `PoisonBottle`.
   * Initializes the poison bottle's properties and loads the relevant images for animation.
   * @param {number} position_x - The horizontal position of the poison bottle.
   */
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
    this.position_y = 60 + Math.random() * (400 - 60);
    this.height = 60;
    this.width = 50;
    this.animate();
  }
}
