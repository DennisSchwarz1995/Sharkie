class Audios {
  /**
   * Creates an instance of `Audios`.
   * Initializes the audio objects for various game sounds.
   */

  constructor() {
    this.backgroundMusic = new Audio("audio/background_music.mp3");
    this.endbossBackgroundMusic = new Audio(
      "audio/endboss-background_music.mp3"
    );
    this.collectCoin = new Audio("audio/collect_coin.mp3");
    this.collectBottle = new Audio("audio/collect_bottle.mp3");
    this.jellyfishShock = new Audio("audio/shock.mp3");
    this.characterSwim = new Audio("audio/swimming.mp3");
    this.characterFinSlap = new Audio("audio/fin_slap.mp3");
    this.characterHurt = new Audio("audio/character_hurt.mp3");
    this.gameWin = new Audio("audio/game_win.mp3");
    this.gameOver = new Audio("audio/game_over.mp3");
    this.bubble = new Audio("audio/bubble_pop.mp3");
    this.finslap = new Audio("audio/fin_slap.mp3");
    this.endbossIntro = new Audio("audio/endboss_intro.mp3");
    this.isMuted = false;
    this.previousVolume = 1;

    this.allAudios = [
      this.backgroundMusic,
      this.endbossBackgroundMusic,
      this.collectCoin,
      this.collectBottle,
      this.jellyfishShock,
      this.characterSwim,
      this.characterFinSlap,
      this.characterHurt,
      this.gameOver,
      this.bubble,
      this.finslap,
      this.endbossIntro,
    ];
  }

  /**
   * Sets the volume for all audio elements managed by the instance.
   * Adjusts the volume property of each audio element to the specified value.
   *
   * @param {number} volume - The volume level to set, between 0 (mute) and 1 (maximum volume).
   */
  setVolume(volume) {
    this.allAudios.forEach((audio) => {
      audio.volume = volume;
    });
  }

  /**
   * Mutes all audio elements by setting their volume to 0.
   * Stores the current volume level before muting.
   */
  mute() {
    this.previousVolume = this.allAudios[0].volume; // Assuming all audios have the same volume
    this.setVolume(0);
    this.isMuted = true;
  }

  /**
   * Unmutes all audio elements by restoring their previous volume level.
   */
  unmute() {
    this.setVolume(this.previousVolume);
    this.isMuted = false;
  }

  /**
   * Toggles the mute state of all audio elements.
   * If currently muted, it will unmute them, and vice versa.
   */
  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }
}
