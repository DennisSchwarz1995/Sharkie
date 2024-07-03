class PufferFish_Orange extends MovableObject {
  height = 70;
  width = 75;
  offset = {
    top: 4,
    bottom: 18,
    left: 0,
    right: 5,
  };
  movingLeft = false;
  isTransitioning = false;
  MOTION_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
  ];

  TRANSITION_IMAGES = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

  PUFF_UP_IMAGES = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
  ];

  constructor(position_x) {
    super().loadImage(
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png'
    );
    this.position_x = position_x;
    this.position_y = Math.random() * 125 + 125;
    this.speed_x = 0.95 + Math.random() * 0.25;
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.TRANSITION_IMAGES);
    this.loadImagesForMotion(this.PUFF_UP_IMAGES);
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      if (this.movingLeft) {
        this.swimLeft();
        this.otherDirection = false;
      } else {
        this.swimRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (!this.isTransitioning && !this.isPuffedUp) {
        this.offset.bottom = 18;
        this.playAnimation(this.MOTION_IMAGES);
      }
    }, 150);

    setStoppableInterval(() => {
      this.movingLeft = !this.movingLeft;
    }, 3000);

    setTimeout(() => {
      this.isTransitioning = true;
      this.animateTransition();
    }, 4750);
  }

  animateTransition() {
    this.currentMotionImage = 0;
    if (this.isTransitioning) {
      let transitionAnimation = setStoppableInterval(() => {
        this.offset.bottom = 3;
        this.playAnimation(this.TRANSITION_IMAGES);
      }, 150);

      setTimeout(() => {
        this.isTransitioning = false;
        clearInterval(transitionAnimation);
        this.isPuffedUp = true;
        this.animatePuffUp();
      }, 1000);
    }
  }

  animatePuffUp() {
    if (this.isPuffedUp) {
      let puffUpAnimation = setStoppableInterval(() => {
        this.playAnimation(this.PUFF_UP_IMAGES);
      }, 150);

      setTimeout(() => {
        this.isPuffedUp = false;
        clearInterval(puffUpAnimation);
      }, 3000);

      setTimeout(() => {
        this.isTransitioning = true;
        this.animateTransition();
      }, 5000);
    }
  }
}
