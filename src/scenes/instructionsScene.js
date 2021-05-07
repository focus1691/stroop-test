import Phaser from 'phaser';
//* Game Objects
import WordContainer from '../game-objects/WordContainer';

export default class playInstructions extends Phaser.Scene {
  constructor() {
    super('playInstructions');
  }
  init(data) {
    this.mode = data.mode === 2 ? 2 : 1;
    this.results = this.mode === 2 ? data.results : [];
  }
  create() {
    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.instructions = [
      `[color=black]In this experiment you are required drag the color of the word to the correct paint bucket, not what the word says. For example, for the word, [color=blue][b]RED[/b][/color][color=black], you should drag it to the blue paintbucket.`,
      `[color=black]In this experiment you are required drag the word to the correct paint bucket based on its meaning, not by colour. For example, for the word, [color=red][b]BLUE[/b][/color][color=black], you should drag it to the blue paintbucket.`,
    ];
    this.wordData = [
      { code: 0x0000ff, color: 'blue', text: 'Red' },
      { code: 0xff0001, color: 'red', text: 'Blue' },
    ];

    var title = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
    this.add.rexBBCodeText(this.cameras.main.width / 4, 40, title, {
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

    this.add.rexBBCodeText(this.cameras.main.width / 8, 150, this.instructions[this.mode - 1], {
      fontSize: '17px',
      align: 'center',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var instructions2 = `[color=black]You will start from left to right and your time will start once you drop the first word.`;
    this.add.rexBBCodeText(this.cameras.main.width / 8, 250, instructions2, {
      fontSize: '17px',
      align: 'center',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var instructions3 = `[color=black]Drag the word below to Start the Stroop Test.`;
    this.add.rexBBCodeText(this.cameras.main.width / 8, 300, instructions3, {
      fontSize: '17px',
      align: 'center',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var word = new WordContainer(this, { x: this.cameras.main.width / 2, y: 350 });
    word.setColor(this.wordData[this.mode - 1]);
    word.input.enabled = true;

    this.paintBucket = this.add.image(this.cameras.main.width / 2, this.cameras.main.height - 10, 'paint', 'blue-paint.png').setInteractive();
    this.paintBucket.setOrigin(0.5, 1);
    this.paintBucket.setScale(0.2, 0.3);
    this.paintBucket.setScrollFactor(0);
    this.paintBucket.input.dropZone = true;
    this.paintBucket.name = 'blue';

    this.correctAnswer = this.sound.add('correct_answer');

    this.input.on(
      'dragstart',
      function (pointer, gameObject, dragX, dragY) {
        gameObject.scene.children.bringToTop(gameObject);
      },
      this
    );

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;

      gameObject.input.enabled = false;

      gameObject.scene.correctAnswer.play();

      gameObject.scene.scene.start('playGame', { mode: gameObject.scene.mode, results: gameObject.scene.results });
    });
  }
  shutdown() {
    this.input.keyboard.shutdown();
  }
}
