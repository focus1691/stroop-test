class playFeedback extends Phaser.Scene {
	constructor () {
		super('playFeedback');
	}
	init (data) {
		this.results = data.results;
	}
	preload () {
  		var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexbbcodetextplugin.min.js';
  		this.load.plugin('rexbbcodetextplugin', url, true);

    	this.load.image('background', 'images/background.jpg');
	}
	create () {
		this.add.tileSprite(0, 0, this.cameras.main.width * 2, this.cameras.main.height * 2, 'background');

		var title = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
		var bbcodetext = this.add.rexBBCodeText(this.cameras.main.width / 4, 40, title, {
			fontSize: '60px',
			wrap: {
				mode: 'char',
				width: 500
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var lineOne = `[color=black]You took [b][u]${this.results[0]} seconds[/u][/b] to complete part one of the test.`;
			this.add.rexBBCodeText(this.cameras.main.width / 8, 150, lineOne, {
			fontSize: '17px',
			align: 'center',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var lineTwo = `[color=black]You took [b][u]${this.results[1]} seconds[/u][/b] to complete part two of the test.`;
			this.add.rexBBCodeText(this.cameras.main.width / 8, 190, lineTwo, {
			fontSize: '17px',
			align: 'center',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var lineThree = `[color=red]Did you have to stop sometimes to think about which word to drag? This it the Stroop Effect and you can learn more about it at PsychoTechnology.`;
			this.add.rexBBCodeText(this.cameras.main.width / 8, 230, lineThree, {
			fontSize: '17px',
			align: 'left',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});
	}
}

class playInstructions extends Phaser.Scene {
	constructor () {
		super('playInstructions');
	}
	init (data) {
		this.mode = data.mode === 2 ? 2 : 1;
		this.results = this.mode === 2 ? data.results : [];
	}
	preload () {
  		var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexbbcodetextplugin.min.js';
  		this.load.plugin('rexbbcodetextplugin', url, true);

    	this.load.image('background', 'images/background.jpg');

		this.load.atlas('paint', 'images/paintbucket.png', 'images/paintbucket.json');

		this.load.bitmapFont('desyrel', 'fonts/desyrel.png', 'fonts/desyrel.xml');

		this.load.audio('correct_answer', 'audio/421002__eponn__correct.wav');
	}
	create () {
		this.add.tileSprite(0, 0, this.cameras.main.width * 2, this.cameras.main.height * 2, 'background');

		this.instructions = [`[color=black]In this experiment you are required drag the color of the word to the correct paint bucket, not what the word says. For example, for the word, [color=blue][b]RED[/b][/color][color=black], you should drag it to the blue paintbucket.`,
							`[color=black]In this experiment you are required drag the word to the correct paint bucket based on its meaning, not by colour. For example, for the word, [color=red][b]BLUE[/b][/color][color=black], you should drag it to the blue paintbucket.`
							];
		this.wordData = [{ code: 0x0000ff, color: 'blue', text: 'Red' }, { code: 0xff0001, color: 'red', text: 'Blue' }];

		var title = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
		this.add.rexBBCodeText(this.cameras.main.width / 4, 40, title, {
			fontSize: '60px',
			wrap: {
				mode: 'char',
				width: 500
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		this.add.rexBBCodeText(this.cameras.main.width / 8, 150, this.instructions[this.mode-1], {
			fontSize: '17px',
			align: 'center',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var instructions2 = `[color=black]You will start from left to right and your time will start once you drop the first word.`;
			this.add.rexBBCodeText(this.cameras.main.width / 8, 250, instructions2, {
			fontSize: '17px',
			align: 'center',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var instructions3 = `[color=black]Drag the word below to Start the Stroop Test.`;
			this.add.rexBBCodeText(this.cameras.main.width / 8, 300, instructions3, {
			fontSize: '17px',
			align: 'center',
			wrap: {
				mode: 'char',
				width: 600
			},
			underline: {
				color: '#000',
				thickness: 2,
				offset: 1
			}
		});

		var word = new WordContainer(this, {x: this.cameras.main.width / 2, y: 350});
		word.setColor(this.wordData[this.mode-1]);
		word.input.enabled = true;

		this.paintBucket = this.add.image(this.cameras.main.width / 2, this.cameras.main.height - 10, 'paint', 'blue-paint.png').setInteractive();
    	this.paintBucket.setOrigin(0.5, 1);
    	this.paintBucket.setScale(0.2, 0.3);
    	this.paintBucket.setScrollFactor(0);
		this.paintBucket.input.dropZone = true;
		this.paintBucket.name = 'blue';

		this.correctAnswer = this.sound.add('correct_answer');

		this.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
			gameObject.scene.children.bringToTop(gameObject);
		}, this);

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
	shutdown () {
		this.input.keyboard.shutdown();
	}
}

class playGame extends Phaser.Scene {
	constructor (mode) {
		super("playGame");
	}
	init (data) {
		this.MODE = data.mode;
		this.startTime;
		this.endTime;
		this.results = data.results;
		this.words = [];
		this.paintBucketPos = [0, 150, 300, 450, 600];
		this.score = 0;
		this.colorArr = [{
		        code: 0xff0001,
		        color: 'red',
		        text: 'Blue'
		    }, {
		        code: 0xff0001,
		        color: 'red',
		        text: 'Yellow'
		    },
		    {
		        code: 0xff0001,
		        color: 'red',
		        text: 'Green'
		    }, {
		        code: 0xff0001,
		        color: 'red',
		        text: 'Purple'
		    },
		    {
		        code: 0x0000ff,
		        color: 'blue',
		        text: 'Red'
		    }, {
		        code: 0x0000ff,
		        color: 'blue',
		        text: 'Yellow'
		    },
		    {
		        code: 0x0000ff,
		        color: 'blue',
		        text: 'Green'
		    }, {
		        code: 0x0000ff,
		        color: 'blue',
		        text: 'Purple'
		    },
		    {
		        code: 0x41b32b,
		        color: 'green',
		        text: 'Red'
		    }, {
		        code: 0x41b32b,
		        color: 'green',
		        text: 'Yellow'
		    },
		    {
		        code: 0x41b32b,
		        color: 'green',
		        text: 'Purple'
		    }, {
		        code: 0x41b32b,
		        color: 'green',
		        text: 'Green'
		    },
		    {
		        code: 0x8e00d7,
		        color: 'purple',
		        text: 'Red'
		    }, {
		        code: 0x8e00d7,
		        color: 'purple',
		        text: 'Yellow'
		    },
		    {
		        code: 0x8e00d7,
		        color: 'purple',
		        text: 'Blue'
		    }, {
		        code: 0x8e00d7,
		        color: 'purple',
		        text: 'Green'
		    },
		    {
		        code: 0xfffc00,
		        color: 'yellow',
		        text: 'Red'
		    }, {
		        code: 0xfffc00,
		        color: 'yellow',
		        text: 'Purple'
		    },
		    {
		        code: 0xfffc00,
		        color: 'yellow',
		        text: 'Blue'
		    }, {
		        code: 0xfffc00,
		        color: 'yellow',
		        text: 'Green'
		    }
		];
	}
	preload () {
    	this.load.bitmapFont('desyrel', 'fonts/desyrel.png', 'fonts/desyrel.xml');

    	this.load.image('background', 'images/background.jpg');

		this.load.atlas('paint', 'images/paintbucket.png', 'images/paintbucket.json');

	    this.load.audio('theme', 'audio/septahelix_-_Twilight_One.mp3');
	    this.load.audio('correct_answer', 'audio/421002__eponn__correct.wav');
	    this.load.audio('incorrect_answer', 'audio/331912__kevinvg207__wrong-buzzer.wav');
	}

	create () {
		this.add.tileSprite(0, 0, this.cameras.main.width * 2, this.cameras.main.height * 2, 'background');

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

		this.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
			gameObject.scene.children.bringToTop(gameObject);
		}, this);

		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
		    gameObject.x = dragX;
		    gameObject.y = dragY;
		});

		this.input.on('dragend', function (pointer, gameObject, dropped) {
		});

		this.input.on('drop', function (pointer, gameObject, dropZone) {

		    let isCorrect = gameObject.scene.checkAnswer(dropZone, gameObject.name, gameObject.colorName);

		    if (!isCorrect) {
				gameObject.x = gameObject.input.dragStartX;
				gameObject.y = gameObject.input.dragStartY;

		    	gameObject.scene.incorrectAnswer.play();
		    } else {
		        gameObject.x = dropZone.x;
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
		    			gameObject.scene.scene.start('playInstructions', {mode: 2, results: scene.results});
		    		}
		    		else if (scene.MODE === 2) {
		    			scene.scene.start('playFeedback', {results: scene.results});
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

	update (time, delta) {

	}
	shutdown () {
		this.input.keyboard.shutdown();
	}
	setup () {
		this.shuffle(this.colorArr);

		let width = this.cameras.main.width * 2;
		width /= 10;
		let x = 0, y = 0, k = 0;

		for (let i = 0; i < 4; i++) {
			x = 0;
			y += 50;
			for (let j = 0; j < 5; j++) {
				x = j * width;
				var word = new WordContainer(this, {x: x, y: y});
				word.setColor(this.colorArr[k++]);
				this.words.push(word);
			}
		}
		this.words[0].input.enabled = true;
	}
	checkAnswer (dropZone, name, colorName) {
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
	randomiseBucketPositions () {
		this.shuffle(this.paintBucketPos);

		this.paintBucket.x = this.paintBucketPos[0];
		this.paintBucket2.x = this.paintBucketPos[1];
		this.paintBucket3.x = this.paintBucketPos[2];
		this.paintBucket4.x = this.paintBucketPos[3];
		this.paintBucket5.x = this.paintBucketPos[4];
	}
	shuffle (a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	}
	addResult () {
		this.endTime = Math.floor((new Date() - this.startTime) / 1000);
		this.results.push(this.endTime);
	}
}

class WordContainer extends Phaser.GameObjects.Container {
	constructor (scene, config) {
		super(scene, config.x, config.y);

		this.word = this.scene.add.dynamicBitmapText(0, 0, 'desyrel', 'Color', 24);
		this.add(this.word);

		this.setSize(this.word.width * 2, this.word.height * 2);

		this.setInteractive();

		this.scene.input.setDraggable(this);

		this.input.enabled = false;

		this.scene.add.existing(this);
	}
	setColor (config) {
		this.name = config.text.toLowerCase();
		this.word.setText(config.text);

		this.setSize(this.word.width * 2, this.word.height * 2);

		this.word.tint = config.code;
		this.colorName = config.color;
	}
}

var config = {
    type: Phaser.AUTO,
    parent: 'stroop-test',
	title: "Stroop Test",
	url: "https://localhost/psychotechnology/stroop-test/",
	version: "1.0.0",
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.DOM.FIT,
        autoCenter: Phaser.DOM.CENTER_BOTH
    },
    scene: [playInstructions, playGame, playFeedback]
};

var game = new Phaser.Game(config);