//* Game Objects
import WordContainer from '../game-objects/WordContainer';

export default class playGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  init(data) {
    this.MODE = data.mode;
    this.startTime;
    this.endTime;
    this.results = data.results;
    this.words = [];
    this.paintBucketPos = [0, 150, 300, 450, 600];
    this.score = 0;
    this.colorArr = [
      {
        code: 0xff0001,
        color: 'red',
        text: 'Blue',
      },
      {
        code: 0xff0001,
        color: 'red',
        text: 'Yellow',
      },
      {
        code: 0xff0001,
        color: 'red',
        text: 'Green',
      },
      {
        code: 0xff0001,
        color: 'red',
        text: 'Purple',
      },
      {
        code: 0x0000ff,
        color: 'blue',
        text: 'Red',
      },
      {
        code: 0x0000ff,
        color: 'blue',
        text: 'Yellow',
      },
      {
        code: 0x0000ff,
        color: 'blue',
        text: 'Green',
      },
      {
        code: 0x0000ff,
        color: 'blue',
        text: 'Purple',
      },
      {
        code: 0x41b32b,
        color: 'green',
        text: 'Red',
      },
      {
        code: 0x41b32b,
        color: 'green',
        text: 'Yellow',
      },
      {
        code: 0x41b32b,
        color: 'green',
        text: 'Purple',
      },
      {
        code: 0x41b32b,
        color: 'green',
        text: 'Green',
      },
      {
        code: 0x8e00d7,
        color: 'purple',
        text: 'Red',
      },
      {
        code: 0x8e00d7,
        color: 'purple',
        text: 'Yellow',
      },
      {
        code: 0x8e00d7,
        color: 'purple',
        text: 'Blue',
      },
      {
        code: 0x8e00d7,
        color: 'purple',
        text: 'Green',
      },
      {
        code: 0xfffc00,
        color: 'yellow',
        text: 'Red',
      },
      {
        code: 0xfffc00,
        color: 'yellow',
        text: 'Purple',
      },
      {
        code: 0xfffc00,
        color: 'yellow',
        text: 'Blue',
      },
      {
        code: 0xfffc00,
        color: 'yellow',
        text: 'Green',
      },
    ];
  }
  create() {
    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.shuffle(this.paintBucketPos);

    this.paintBucket = this.add.image(this.paintBucketPos[0], this.cameras.main.height / 2, 'paint', 'red-paint.png').setInteractive();
    this.paintBucket.setOrigin(0);
    this.paintBucket.setScale(0.2, 0.3);
    this.paintBucket.setScrollFactor(0);
    this.paintBucket.input.dropZone = true;
    this.paintBucket.name = 'red';

    this.paintBucket2 = this.add.image(this.paintBucketPos[1], this.cameras.main.height / 2, 'paint', 'green-paint.png').setInteractive();
    this.paintBucket2.setOrigin(0);
    this.paintBucket2.setScale(0.2, 0.3);
    this.paintBucket2.setScrollFactor(0);
    this.paintBucket2.input.dropZone = true;
    this.paintBucket2.name = 'green';

    this.paintBucket3 = this.add.image(this.paintBucketPos[2], this.cameras.main.height / 2, 'paint', 'yellow-paint.png').setInteractive();
    this.paintBucket3.setOrigin(0);
    this.paintBucket3.setScale(0.2, 0.3);
    this.paintBucket3.setScrollFactor(0);
    this.paintBucket3.input.dropZone = true;
    this.paintBucket3.name = 'yellow';

    this.paintBucket4 = this.add.image(this.paintBucketPos[3], this.cameras.main.height / 2, 'paint', 'blue-paint.png').setInteractive();
    this.paintBucket4.setOrigin(0);
    this.paintBucket4.setScale(0.2, 0.3);
    this.paintBucket4.setScrollFactor(0);
    this.paintBucket4.input.dropZone = true;
    this.paintBucket4.name = 'blue';

    this.paintBucket5 = this.add.image(this.paintBucketPos[4], this.cameras.main.height / 2, 'paint', 'purple-paint.png').setInteractive();
    this.paintBucket5.setOrigin(0);
    this.paintBucket5.setScale(0.2, 0.3);
    this.paintBucket5.setScrollFactor(0);
    this.paintBucket5.input.dropZone = true;
    this.paintBucket5.name = 'purple';

    this.correctAnswer = this.sound.add('correct_answer');
    this.incorrectAnswer = this.sound.add('incorrect_answer');

    this.setup();

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

    this.input.on('dragend', function (pointer, gameObject, dropped) {});

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      let isCorrect = gameObject.scene.checkAnswer(dropZone, gameObject.name, gameObject.colorName);

      if (!isCorrect) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;

        gameObject.scene.incorrectAnswer.play();
      } else {
        gameObject.x = dropZone.x + gameObject.width / 2;
        gameObject.y = dropZone.y;

        gameObject.input.enabled = false;

        gameObject.scene.correctAnswer.play();

        gameObject.scene.randomiseBucketPositions();

        let index = ++gameObject.scene.score;

        var scene = gameObject.scene;

        if (scene.score === 20) {
          scene.addResult();
          scene.music.stop();

          if (scene.MODE === 1) {
            gameObject.scene.scene.start('playInstructions', { mode: 2, results: scene.results });
          } else if (scene.MODE === 2) {
            scene.scene.start('playFeedback', { results: scene.results });
          }
        } else {
          gameObject.scene.words[index].input.enabled = true;
          if (scene.score === 1) {
            scene.startTime = new Date();
          }
        }
      }
    });

    this.music = this.sound.add('theme');
    this.music.play();
  }

  update(time, delta) {}
  shutdown() {
    this.input.keyboard.shutdown();
  }
  setup() {
    this.shuffle(this.colorArr);

    let width = this.cameras.main.width * 2;
    width /= 10;
    let x = 0,
      y = 0,
      k = 0;

    for (let row = 0; row < 4; row++) {
      x = 0;
      y += 50;
      for (let col = 0; col < 5; col++) {
        x = col * width;
        var word = new WordContainer(this, { x, y });
        word.setColor(this.colorArr[k++]);
        this.words.push(word);
      }
    }
    this.words[0].input.enabled = true;
  }
  checkAnswer(dropZone, name, colorName) {
    // Matches the paint bucket color with the word name
    if (this.MODE === 1) {
      if (dropZone.name === colorName) {
        return true;
      }
    }
    // Matches the paint bucket color with the word color
    else if (this.MODE === 2) {
      if (dropZone.name === name) {
        return true;
      }
    }
    return false;
  }
  randomiseBucketPositions() {
    this.shuffle(this.paintBucketPos);

    this.paintBucket.x = this.paintBucketPos[0];
    this.paintBucket2.x = this.paintBucketPos[1];
    this.paintBucket3.x = this.paintBucketPos[2];
    this.paintBucket4.x = this.paintBucketPos[3];
    this.paintBucket5.x = this.paintBucketPos[4];
  }
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  addResult() {
    this.endTime = Math.floor((new Date() - this.startTime) / 1000);
    this.results.push(this.endTime);
  }
}
