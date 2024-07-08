class Level {
    pufferfish;
    jellyfish;
    endboss;
    backgroundObjects;
    light;
    coins;
    level_end_x = 3600;

    constructor(pufferfish, jellyfish, endboss, backgroundObjects, light, coins, poisonbottles) {
        this.pufferfish = pufferfish;
        this.jellyfish = jellyfish;
        this.endboss = endboss,
        this.backgroundObjects = backgroundObjects;
        this.light = light;
        this.coins = coins;
        this.poisonbottles = poisonbottles;
    }
}