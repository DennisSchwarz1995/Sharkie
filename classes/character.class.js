class Character extends MovableObject  {
  height = 200;
  width = 200;
  speed_x = 10;
  MOTION_IMAGES = [
    'img/1.Sharkie/3.Swim/1.png',
    'img/1.Sharkie/3.Swim/2.png',
    'img/1.Sharkie/3.Swim/3.png',
    'img/1.Sharkie/3.Swim/4.png',
    'img/1.Sharkie/3.Swim/5.png',
    'img/1.Sharkie/3.Swim/6.png',
  ];

  IDLE_IMAGES = [
    'img/1.Sharkie/1.IDLE/1.png',
    'img/1.Sharkie/1.IDLE/2.png',
    'img/1.Sharkie/1.IDLE/3.png',
    'img/1.Sharkie/1.IDLE/4.png',
    'img/1.Sharkie/1.IDLE/5.png',
    'img/1.Sharkie/1.IDLE/6.png',
    'img/1.Sharkie/1.IDLE/7.png',
    'img/1.Sharkie/1.IDLE/8.png',
    'img/1.Sharkie/1.IDLE/9.png',
    'img/1.Sharkie/1.IDLE/10.png',
    'img/1.Sharkie/1.IDLE/11.png',
    'img/1.Sharkie/1.IDLE/12.png',
    'img/1.Sharkie/1.IDLE/13.png',
    'img/1.Sharkie/1.IDLE/14.png',
    'img/1.Sharkie/1.IDLE/15.png',
    'img/1.Sharkie/1.IDLE/16.png',
    'img/1.Sharkie/1.IDLE/17.png',
    'img/1.Sharkie/1.IDLE/18.png',
  ];

 LONG_IDLE_IMAGES = [
    'img/1.Sharkie/2.Long_IDLE/i1.png',
    'img/1.Sharkie/2.Long_IDLE/i2.png',
    'img/1.Sharkie/2.Long_IDLE/i3.png',
    'img/1.Sharkie/2.Long_IDLE/i4.png',
    'img/1.Sharkie/2.Long_IDLE/i5.png',
    'img/1.Sharkie/2.Long_IDLE/i6.png',
    'img/1.Sharkie/2.Long_IDLE/i7.png',
    'img/1.Sharkie/2.Long_IDLE/i8.png',
    'img/1.Sharkie/2.Long_IDLE/i9.png',
    'img/1.Sharkie/2.Long_IDLE/i10.png',
    'img/1.Sharkie/2.Long_IDLE/i11.png',
    'img/1.Sharkie/2.Long_IDLE/i12.png',
    'img/1.Sharkie/2.Long_IDLE/i13.png',
    'img/1.Sharkie/2.Long_IDLE/i14.png',
  ];

  DEAD_IMAGES = [
    'img/1.Sharkie/6.dead/1.Poisoned/1.png',
    'img/1.Sharkie/6.dead/1.Poisoned/2.png',
    'img/1.Sharkie/6.dead/1.Poisoned/3.png',
    'img/1.Sharkie/6.dead/1.Poisoned/4.png',
    'img/1.Sharkie/6.dead/1.Poisoned/5.png',
    'img/1.Sharkie/6.dead/1.Poisoned/6.png',
    'img/1.Sharkie/6.dead/1.Poisoned/7.png',
    'img/1.Sharkie/6.dead/1.Poisoned/8.png',
    'img/1.Sharkie/6.dead/1.Poisoned/9.png',
    'img/1.Sharkie/6.dead/1.Poisoned/10.png',
    'img/1.Sharkie/6.dead/1.Poisoned/11.png',
    'img/1.Sharkie/6.dead/1.Poisoned/12.png',
  ];

  HURT_POISONED_IMAGES = [
    'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
  ];

  HURT_SHOCKED_IMAGES = [
    'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
  ];
  
  world;
  swimming_sound = new Audio('audio/swimming.mp3');
  idle_count = 0;
  offset = {
    top: 95,
    bottom: 40,
    left: 30,
    right: 30
  }

  constructor() {
    super().loadImage('img/1.Sharkie/3.Swim/1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.IDLE_IMAGES);
    this.loadImagesForMotion(this.LONG_IDLE_IMAGES);
    this.loadImagesForMotion(this.HURT_POISONED_IMAGES);
    this.loadImagesForMotion(this.HURT_SHOCKED_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.animateCharacter();
  }

  animateCharacter() {
    this.swimming_sound.pause();
    this.startDirectionAnimation();


    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
        this.swimRight()
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.swimLeft()
        this.otherDirection = true;
      }
      if (this.world.keyboard.UP && this.position_y > -80) {
        this.swimUp()
      }
      if (this.world.keyboard.DOWN && this.position_y < 300) {
        this.swimDown()
      }
      this.updateCameraPosition()
    }, 1000 / 60);
  }


  startDirectionAnimation() {
    setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.DEAD_IMAGES);
            return;
        }

        if (this.isHurt()) {
            this.playAnimation(this.HURT_POISONED_IMAGES);
            return;
        }

        if (this.isMoving()) {
            this.playAnimation(this.MOTION_IMAGES);
            this.idle_count = 0;
        } else {
            this.idle_count++;
            if (this.idle_count >= 60) {
                this.playAnimation(this.LONG_IDLE_IMAGES);
            } else if (this.idle_count % 3 === 0) {
                this.playAnimation(this.IDLE_IMAGES);
            }
        }
    }, 50);
}



  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
  }
}
