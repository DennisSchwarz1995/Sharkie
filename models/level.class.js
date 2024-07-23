class Level {
  /**
   * Creates an instance of `Level`.
   * @param {Pufferfish[]} pufferfish - List of pufferfish objects in the level.
   * @param {JellyFish[]} jellyfish - List of jellyfish objects in the level.
   * @param {Endboss} endboss - The endboss object in the level.
   * @param {BackgroundObject[]} backgroundObjects - List of background objects in the level.
   * @param {Light} light - Light object providing illumination or effects in the level.
   * @param {Coin[]} coins - List of coin objects in the level.
   * @param {PoisonBottle[]} poisonbottles - List of poison bottle objects in the level.
   */
  pufferfish;
  jellyfish;
  endboss;
  backgroundObjects;
  light;
  coins;
  level_end_x = 3600;

  constructor(
    pufferfish,
    jellyfish,
    endboss,
    backgroundObjects,
    light,
    coins,
    poisonbottles
  ) {
    this.pufferfish = pufferfish;
    this.jellyfish = jellyfish;
    (this.endboss = endboss), (this.backgroundObjects = backgroundObjects);
    this.light = light;
    this.coins = coins;
    this.poisonbottles = poisonbottles;
  }
}
