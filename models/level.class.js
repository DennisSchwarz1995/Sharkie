class Level {
    pufferfish;
    jellyfish;
    endboss;
    backgroundObjects;
    light;
    coins;
    level_end_x = 2160;

    constructor(pufferfish, jellyfish, endboss, backgroundObjects, light, coins) {
        this.pufferfish = pufferfish;
        this.jellyfish = jellyfish;
        this.endboss = endboss,
        this.backgroundObjects = backgroundObjects;
        this.light = light;
        this.coins = coins;
    }
}