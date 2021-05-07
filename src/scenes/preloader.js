import Phaser from 'phaser';
//* Images
import background from '../images/background.jpg';
//* Spritesheets
import paintBucket from '../images/paintbucket.png';
import paintBucketJSON from '../images/paintbucket.json';
//* Font
import desyrelImg from '../fonts/desyrel.png';
import desyrelXML from '../fonts/desyrel.xml';
//* Audio
import theme from '../audio/septahelix_-_Twilight_One.mp3';
import correctAudio from '../audio/421002__eponn__correct.wav';
import incorrectAudio from '../audio/331912__kevinvg207__wrong-buzzer.wav';

export default class preloaderScene extends Phaser.Scene {
  constructor() {
    super('preloaderScene');
  }
  preload() {
    const W = this.game.config.width;
    const H = this.game.config.height;
    const BAR_FRAME_W = W / 4;
    const BAR_FRAME_H = H / 16;
    const BAR_W = BAR_FRAME_W - 110;
    const BAR_H = BAR_FRAME_H - 10;

    this.loadingText = this.add.text(0, 0, 'Loading: ', { fontSize: '1.5rem', fill: '#FFF' });
    this.loadingText.setPosition(this.game.config.width / 2 - this.loadingText.width / 1.5, this.game.config.height / 2 - this.loadingText.height / 1.5);
    this.loadingText.setDepth(2);

    this.xPos = W / 2 - this.loadingText.width / 1.5;
    this.yPos = H / 2 + this.loadingText.height / 1.5;

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    var progressBar = new Phaser.Geom.Rectangle(this.xPos, this.yPos, BAR_FRAME_W, BAR_FRAME_H);
    var progressBarFill = new Phaser.Geom.Rectangle(this.xPos + 5, this.yPos + 5, BAR_W, BAR_H);

    this.graphics.fillStyle(0xffffff, 2);
    this.graphics.fillRectShape(progressBar);
    this.graphics.setDepth(2);

    this.newGraphics.fillStyle(0xaf111c, 1);
    this.newGraphics.fillRectShape(progressBarFill);
    this.newGraphics.setDepth(2);

    this.load.image('background', background);

    this.load.atlas('paint', paintBucket, paintBucketJSON);

    this.load.bitmapFont('desyrel', desyrelImg, desyrelXML);

    this.load.audio('theme', theme);
    this.load.audio('correct_answer', correctAudio);
    this.load.audio('incorrect_answer', incorrectAudio);

    this.load.on('progress', this.updateBar, this);
    this.load.on('complete', this.complete, this);
  }

  create() {
    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 }, depth: 1 });

    const titleText = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
    this.title = this.add.rexBBCodeText(this.cameras.main.width / 4, 150, titleText, {
      fontSize: '60px',
      wrap: {
        mode: 'char',
        width: 500,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });
    this.title.setDepth(2);
  }
  render() {
    this.children.bringToTop(this.newGraphics);
    this.children.bringToTop(this.loadingText);
  }

  updateBar(percentage) {
    const W = this.game.config.width;
    const H = this.game.config.height;
    const BAR_FRAME_W = W / 4;
    const BAR_FRAME_H = H / 16;
    const BAR_W = BAR_FRAME_W - 110;
    const BAR_H = BAR_FRAME_H - 10;

    this.newGraphics.clear();
    this.newGraphics.fillStyle(0xaf111c, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.xPos + 5, this.yPos + 5, percentage * (BAR_FRAME_W - 10), BAR_H));

    percentage = percentage * 100;
    this.loadingText.setText('Loading: ' + percentage.toFixed(2) + '%');
  }
  complete() {
    this.scene.start('playInstructions');
  }
}
