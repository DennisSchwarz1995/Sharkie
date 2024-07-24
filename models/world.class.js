class World {
  /**
   * Creates an instance of `World`.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
   * @param {Keyboard} keyboard - The keyboard input manager.
   * @param {Assets} assets - The asset manager for handling images and animations.
   * @param {Audios} audios - The audio manager for handling game sounds.
   */
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
  isDrawing = true;
  isInAttackAnimation = false;
  gameWon = false;
  gameOver = false;

  constructor(canvas, keyboard, assets, audios) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.assets = assets;
    this.audios = audios;
    this.audios.setVolume(0.05);
    this.drawObjects();
    this.setWorld();
    this.checkGameState();
    this.playBackgroundMusic();
  }

  /**
   * Sets the world context for the endboss.
   */
  setWorld() {
    this.endboss.world = this;
  }

  /**
   * Sets the `isDrawing` flag to `false` and clears the drawing context.
   */
  clearCanvas() {
    this.isDrawing = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Starts playing the background music, resets the music to the beginning, plays it, and sets it to loop indefinitely.
   */
  playBackgroundMusic() {
    this.audios.backgroundMusic.currentTime = 0;
    this.audios.backgroundMusic.play();
    this.audios.backgroundMusic.loop = true;
  }

  /**
   * Clears the canvas if `isDrawing` is `true`, applies camera translation, and draws background objects, enemies, collectables, and the character.
   * Restores camera translation and draws character status bars.
   */
  drawObjects() {
    if (!this.isDrawing) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectArraysToCanvas(this.level.backgroundObjects);
    this.drawEnemies();
    this.drawCollectables();
    this.addObjectArraysToCanvas(this.throwableObjects);
    this.addToCanvas(this.character);
    if (this.endboss.isBossIntroduced) {
      this.addToCanvas(this.endbossStatusBar);
    }
    this.ctx.translate(-this.camera_x, 0);
    this.drawCharacterBars();
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.startFrames();
  }

  /**
   * Draws all enemies in the level onto the canvas.
   */
  drawEnemies() {
    this.addObjectArraysToCanvas(this.level.pufferfish);
    this.addObjectArraysToCanvas(this.level.jellyfish);
    this.addObjectArraysToCanvas(this.level.endboss);
  }

  /**
   * Draws all collectable items in the level onto the canvas.
   */
  drawCollectables() {
    this.addObjectArraysToCanvas(this.level.light);
    this.addObjectArraysToCanvas(this.level.coins);
    this.addObjectArraysToCanvas(this.level.poisonbottles);
  }

  /**
   * Draws all character-related status bars onto the canvas.
   */
  drawCharacterBars() {
    this.addToCanvas(this.statusBar);
    this.addToCanvas(this.coinBar);
    this.addToCanvas(this.poisonBar);
  }

  /**
   * Starts the animation frame loop for drawing objects.
   * Uses `requestAnimationFrame` to continuously call `drawObjects`.
   */
  startFrames() {
    let self = this;
    requestAnimationFrame(function () {
      self.drawObjects();
    });
  }

  /**
   * Adds a displayed object to the canvas.
   * If the object is facing the other direction, the image is rotated horizontally.
   * Draws the object and then restores the image rotation if necessary.
   *
   * @param {Object} displayedObject - The object to be drawn on the canvas.
   */
  addToCanvas(displayedObject) {
    if (displayedObject.otherDirection) {
      this.rotateImageHorizontally(displayedObject);
    }
    displayedObject.draw(this.ctx);
    if (displayedObject.otherDirection) {
      this.restoreImageRotation(displayedObject);
    }
  }

  /**
   * Adds multiple objects to the canvas.
   *
   * @param {Array} objects - An array of objects to be added to the canvas.
   */
  addObjectArraysToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  /**
   * Used to flip the image when the object is facing the other direction.
   *
   * @param {Object} displayedObject - The object whose image is to be rotated.
   */
  rotateImageHorizontally(displayedObject) {
    this.ctx.save();
    this.ctx.translate(displayedObject.width, 0);
    this.ctx.scale(-1, 1);
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  /**
   * Restores the image rotation of a displayed object to its original state.
   * This is called after the object has been drawn with the rotated image.
   *
   * @param {Object} displayedObject - The object whose image rotation is to be restored.
   */
  restoreImageRotation(displayedObject) {
    this.ctx.restore();
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  /**
   * Periodically checks the game state for collisions and win/lose conditions.
   */
  checkGameState() {
    setStoppableInterval(() => {
      this.checkCollision();
      this.checkGameOver();
      this.checkGameWin();
    }, 100);
  }

  /**
   * Sets the game as won, stops the background music, plays the win sound, and shows the win overlay.
   */
  checkGameWin() {
    if (
      this.character.hitpoints > 0 &&
      this.endboss.hitpoints <= 0 &&
      !this.gameWon
    ) {
      this.gameWon = true;
      this.audios.backgroundMusic.pause();
      this.audios.endbossBackgroundMusic.pause();
      this.audios.gameWin.play();
      hideOptions();
      setTimeout(() => {
        stopGame();
        showOverlay('win');
      }, 2500);
    }
  }

  /**
   * Sets the game as over, stops the background music, plays the game over sound, and shows the game over overlay.
   */
  checkGameOver() {
    if (this.character.hitpoints <= 0 && !this.gameOver) {
      this.gameOver = true;
      this.audios.backgroundMusic.pause();
      this.audios.endbossBackgroundMusic.pause();
      this.audios.gameOver.play();
      hideOptions();
      setTimeout(() => {
        stopGame();
        showOverlay('loose');
      }, 2500);
    }
  }

  /**
   * Checks for collisions between the character and various game elements such as enemies, collectables, bubbles and how far the bubble has traveled.
   */
  checkCollision() {
    this.checkCollisionWithPufferfish();
    this.checkCollisionWithJellyfish();
    this.checkCollisionWithCoin();
    this.checkCollisionWithPoisonbottle();
    this.checkBubbleCollisionWithJellyfish();
    this.checkBubbleCollisionWithEndboss();
    this.checkCollisionWithEndboss();
    this.checkBubbleTravaledDistance();
  }

  /**
   * Checks for collisions between the character and pufferfish.
   * Handles attacks on pufferfish and updates the character's hitpoints if necessary.
   */
  checkCollisionWithPufferfish() {
    this.level.pufferfish.forEach((pufferfish, index) => {
      if (this.character.isColliding(pufferfish)) {
        if (this.keyboard.F && !this.isInAttackAnimation) {
          this.attackPufferFish(pufferfish, index);
        } else if (
          !this.character.isImmun() &&
          !this.character.isDead() &&
          !this.isInAttackAnimation &&
          !pufferfish.isPufferFishDead
        ) {
          this.collideWithPufferFish(pufferfish);
        }
      }
    });
  }

  /**
   * Handles the attack on a Pufferfish.
   * This method initiates the attack animation on the Pufferfish and removes it from the level
   * if it is positioned below a certain threshold.
   *
   * @param {Pufferfish} pufferfish - The Pufferfish object being attacked.
   * @param {number} index - The index of the Pufferfish in the level's pufferfish array.
   * @returns {void}
   */
  attackPufferFish(pufferfish, index) {
    this.isInAttackAnimation = true;
    pufferfish.animatePufferFishDeath();

    setTimeout(() => {
      // Check if the Pufferfish is below a certain position and remove it if true
      if (this.level.pufferfish[index].position_y < 300) {
        this.level.pufferfish.splice(index, 1);
      }
      this.isInAttackAnimation = false;
    }, 800);
  }

  /**
   * Handles the collision with a Pufferfish.
   * This method processes the effects of the collision on the character, such as taking damage
   * and updating the status bar. It also manages the character's hit state and plays the hurt sound.
   *
   * @returns {void}
   */
  collideWithPufferFish() {
    this.character.hit();
    this.character.isHitByPufferfish = true;

    setTimeout(() => {
      this.character.isHitByPufferfish = false;
    }, 1000);

    this.audios.characterHurt.play();
    this.statusBar.setPercentage(
      this.character.hitpoints,
      this.statusBar.LIFE_BAR_IMAGES
    );
  }

  /**
   * Checks for collisions between the character and jellyfish.
   * Updates the character's hitpoints and plays a sound if a collision occurs.
   */
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

  /**
   * Checks for collisions between the character and the endboss.
   * Updates the character's hitpoints and plays a sound if a collision occurs.
   */
  checkCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (
        this.character.isColliding(endboss) &&
        !this.character.isImmun() &&
        !this.character.isDead() &&
        !endboss.isEndbossDead && 
        endboss.isBossIntroduced
      ) {
        this.character.hit();
        this.character.isHitByEndboss = true;
        setTimeout(() => {
          this.character.isHitByEndboss = false;
        }, 1000);
        this.audios.characterHurt.play();
        this.statusBar.setPercentage(
          this.character.hitpoints,
          this.statusBar.LIFE_BAR_IMAGES
        );
      }
    });
  }

  /**
   * Checks for collisions between throwable bubbles and jellyfish.
   * If a bubble collides with a jellyfish, the jellyfish is removed and the bubble is deleted from the throwable objects.
   */
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

  /**
   * Checks for collisions between throwable bubbles and the endboss.
   * If a bubble collides with the endboss, the endboss is damaged based on the type of bubble.
   * Updates the endboss status bar and removes the bubble from the throwable objects.
   */
  checkBubbleCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      this.throwableObjects.forEach((bubble, bubbleIndex) => {
        if (bubble.isColliding(endboss)) {
          if (bubble.type === 'poison') {
            endboss.hit('poison');
          } else {
            endboss.hit();
          }
          endboss.isEndbossHurt = true;
          this.throwableObjects.splice(bubbleIndex, 1);
          this.endbossStatusBar.setPercentage(
            this.endboss.hitpoints,
            this.endbossStatusBar.LIFE_BAR_IMAGES
          );
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and coins.
   * If the character collides with a coin, the coin is collected, and the coin count is updated.
   */
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

  /**
   * Checks for collisions between the character and poison bottles.
   * If the character collides with a poison bottle, it is collected, and the poison level is updated.
   */
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

  /**
   * Creates and adds a normal bubble to the throwable objects array.
   * The bubble is positioned relative to the character and moves in the direction the character is facing.
   */
  shootBubble() {
    let bubble = new ThrowableObject(this.character.position_x + 150, this.character.position_y + 120, this.character.otherDirection, 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png', 'normal');
    this.throwableObjects.push(bubble);
    this.audios.bubble.play();
  }

  /**
   * Creates and adds a poison bubble to the throwable objects array.
   * The bubble is positioned relative to the character, moves in the direction the character is facing, and reduces the character's poison level by 20.
   */
  shootPoisonBubble() {
    let bubble = new ThrowableObject(this.character.position_x + 150, this.character.position_y + 120, this.character.otherDirection, 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png', 'poison');
    this.throwableObjects.push(bubble);
    this.audios.bubble.play();
    this.character.poison -= 20;
    this.poisonBar.setPercentage(
      this.character.poison,
      this.poisonBar.POISON_BAR_IMAGES
    );
  }

  /**
   * Checks if any bubbles have traveled beyond their maximum distance.
   * Removes bubbles from the throwable objects array if they have traveled their maximum distance.
   */
  checkBubbleTravaledDistance() {
    this.throwableObjects.forEach((bubble, index) => {
      let distanceTraveled = Math.abs(
        bubble.position_x - bubble.startPosition_x
      );
      if (distanceTraveled >= bubble.maxDistance) {
        this.throwableObjects.splice(index, 1);
      }
    });
  }
}
