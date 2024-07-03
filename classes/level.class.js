class Level {
    enemies;
    backgroundObjects;
    light;
    coins;
    level_end_x = 2160;

    constructor(enemies, backgroundObjects, light, coins) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.light = light;
        this.coins = coins;
    }
}