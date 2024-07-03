class World {
  assets;
  character;
  statusBar = new StatusBar();
  coinBar = new Coinbar();
  poisonBar = new PoisonBar();
  throwableObjects = [];
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard, assets) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.assets = assets;
    this.character = new Character(assets);
    this.character.world = this;
  }

  setWorld() {
    this.character.world = this;
  }


  drawObjects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectArraysToCanvas(this.level.backgroundObjects);
    this.addObjectArraysToCanvas(this.level.pufferfish);
    this.addObjectArraysToCanvas(this.level.jellyfish);
    this.addObjectArraysToCanvas(this.level.endboss);
    this.addObjectArraysToCanvas(this.level.light);
    this.addObjectArraysToCanvas(this.level.coins);
    this.addObjectArraysToCanvas(this.throwableObjects);

    this.addToCanvas(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToCanvas(this.statusBar);
    this.addToCanvas(this.coinBar);
    this.addToCanvas(this.poisonBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.drawObjects();
    });
  }

  addToCanvas(displayedObject) {
    if (displayedObject.otherDirection) {
      this.rotateImageHorizontally(displayedObject);
    }

    displayedObject.draw(this.ctx);
    displayedObject.drawCollisionBorderWithOffset(this.ctx);

    if (displayedObject.otherDirection) {
      this.restoreImageRotation(displayedObject);
    }
  }

  addObjectArraysToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  rotateImageHorizontally(displayedObject) {
    this.ctx.save();
    this.ctx.translate(displayedObject.width, 0);
    this.ctx.scale(-1, 1);
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  restoreImageRotation(displayedObject) {
    this.ctx.restore();
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  checkGameState() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
    }, 100);
  }

  checkCollision() {
    this.checkCollisionWithPufferfish();
    this.checkCollisionWithJellyfish();
    this.checkCollisionWithCoin();
  }

  checkCollisionWithPufferfish() {
    this.level.pufferfish.forEach((pufferfish) => {
      if (this.character.isColliding(pufferfish) && !this.character.isImmun()) {
        this.character.hit();
        this.character.isHitByPufferfish = true;
        setTimeout(() => {
          this.character.isHitByPufferfish = false;
        }, 1000)
        console.log('Hit by', pufferfish)
        this.statusBar.setPercentage(
          this.character.hitpoints,
          this.statusBar.LIFE_BAR_IMAGES
        );
      }
    });
  }

  checkCollisionWithJellyfish() {
    this.level.jellyfish.forEach((jellyfish) => {
      if (this.character.isColliding(jellyfish) && !this.character.isImmun()) {
        this.character.hit();
        this.character.isHitByJellyfish = true;
        setTimeout(() => {
          this.character.isHitByJellyfish = false;
        }, 1000)
        this.statusBar.setPercentage(
          this.character.hitpoints,
          this.statusBar.LIFE_BAR_IMAGES
        );
      }
    });
  }

  checkCollisionWithCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && !this.character.isDead()) {
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.coinBar.setPercentage(
          this.character.coins,
          this.coinBar.COIN_BAR_IMAGES
        );
      }
    });
  }
  

  checkThrowObjects() {
    if (this.keyboard.SPACE && this.character.coins > 0) {
      let bubble = new ThrowableObject(
        this.character.position_x + 150,
        this.character.position_y + 120
      );
      this.throwableObjects.push(bubble);
    }
  }
}



