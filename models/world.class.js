class World {
  assets;
  audios;
  character = new Character(this, assets);
  statusBar = new StatusBar();
  coinBar = new Coinbar();
  poisonBar = new PoisonBar();
  throwableObjects = [];
  level = level1;
  endboss = this.level.endboss.find((endboss) => endboss instanceof Endboss);
  endbossStatusBar = new EndbossStatusbar(this);
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  isInAttackAnimation = false;

  constructor(canvas, keyboard, assets, audios) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.assets = assets;
    this.audios = audios;
    this.audios.setVolume(0.05);
    this.drawObjects();
    this.setWorld();
    this.checkGameState();
    this.playBackgroundMusic();
  }

  setWorld() {
    this.endboss.world = this;
  }

  playBackgroundMusic() {
    this.audios.backgroundMusic.play();
    this.audios.backgroundMusic.loop = true;
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
    this.addObjectArraysToCanvas(this.level.poisonbottles);
    this.addObjectArraysToCanvas(this.throwableObjects);

    this.addToCanvas(this.character);

    if (this.endboss.isBossIntroduced) {
      this.addToCanvas(this.endbossStatusBar);
    }

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
    }, 100);
  }

  checkCollision() {
    this.checkCollisionWithPufferfish();
    this.checkCollisionWithJellyfish();
    this.checkCollisionWithCoin();
    this.checkCollisionWithPoisonbottle();
    this.checkBubbleCollisionWithJellyfish();
  }

  checkCollisionWithPufferfish() {
    this.level.pufferfish.forEach((pufferfish, index) => {
      if (
        this.character.isColliding(pufferfish) &&
        this.keyboard.F &&
        !this.isInAttackAnimation
      ) {
        this.isInAttackAnimation = true;
        pufferfish.animatePufferFishDeath();
        setTimeout(() => {
          if (this.level.pufferfish.position_y < 300) {
            this.level.pufferfish.splice(index, 1);
          }
          this.isInAttackAnimation = false;
        }, 800);
      }

      if (
        this.character.isColliding(pufferfish) &&
        !this.character.isImmun() &&
        !this.character.isDead() &&
        !this.isInAttackAnimation &&
        !pufferfish.isPufferFishDead
      ) {
        this.character.hit();
        this.character.isHitByPufferfish = true;
        setTimeout(() => {
          this.character.isHitByPufferfish = false;
        }, 1000);
        this.statusBar.setPercentage(
          this.character.hitpoints,
          this.statusBar.LIFE_BAR_IMAGES
        );
      }
    });
  }

  checkCollisionWithJellyfish() {
    this.level.jellyfish.forEach((jellyfish) => {
      if (
        this.character.isColliding(jellyfish) &&
        !this.character.isImmun() &&
        !this.character.isDead() &&
        !jellyfish.isJellyFishDead
      ) {
        this.character.hit();
        this.character.isHitByJellyfish = true;
        setTimeout(() => {
          this.character.isHitByJellyfish = false;
        }, 1000);
        this.audios.jellyfishShock.play();
        this.statusBar.setPercentage(
          this.character.hitpoints,
          this.statusBar.LIFE_BAR_IMAGES
        );
      }
    });
  }

  checkBubbleCollisionWithJellyfish() {
    this.level.jellyfish.forEach((jellyfish, jellyfishIndex) => {
      this.throwableObjects.forEach((bubble, bubbleIndex) => {
        if (bubble.isColliding(jellyfish)) {
          jellyfish.animateJellyFishDeath();
          this.throwableObjects.splice(bubbleIndex, 1);
          setTimeout(() => {
            this.level.jellyfish.splice(jellyfishIndex, 1);
          }, 850);
        }
      });
    });
  }

  checkCollisionWithCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && !this.character.isDead()) {
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.audios.collectCoin.play();
        this.coinBar.setPercentage(
          this.character.coins,
          this.coinBar.COIN_BAR_IMAGES
        );
      }
    });
  }

  checkCollisionWithPoisonbottle() {
    this.level.poisonbottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && !this.character.isDead()) {
        this.character.collectPoisonbottle();
        this.level.poisonbottles.splice(index, 1);
        this.audios.collectBottle.play();
        this.poisonBar.setPercentage(
          this.character.poison,
          this.poisonBar.POISON_BAR_IMAGES
        );
      }
    });
  }

  shootBubble() {
    let bubble = new ThrowableObject(
      this.character.position_x + 150,
      this.character.position_y + 120,
      this.character.otherDirection,
      "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"
    );
    this.throwableObjects.push(bubble);
    this.audios.bubble.play();
  }

  shootPoisonBubble() {
    let bubble = new ThrowableObject(
      this.character.position_x + 150,
      this.character.position_y + 120,
      this.character.otherDirection,
      "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
    );
    this.throwableObjects.push(bubble);
    this.audios.bubble.play();
    this.character.poison -= 20;
    this.poisonBar.setPercentage(
      this.character.poison,
      this.poisonBar.POISON_BAR_IMAGES
    );
  }
}
