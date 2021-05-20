import psychotechnologyVideo from '../video/welcome.mp4';

export default class introductionScene extends Phaser.Scene {
  constructor() {
    super('introduction');
  }
  preload() {
    this.load.video('psychotechnology', NODE_ENV === 'development' ? psychotechnologyVideo : 'https://www.psychotechnology.com/videos/welcome.mp4', 'loadeddata', false, false);
  }
  create() {
    var vid = this.add.video(this.game.config.width / 2, this.game.config.height / 2, 'psychotechnology');
    vid.setDisplaySize(this.game.config.width, this.game.config.height);

    vid.play(false);

    // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
    vid.setPaused(false);

    vid.on('complete', this.onComplete, this);
  }
  onComplete() {
    console.log('ended');
    this.scene.start('preloaderScene');
  }
}
