var map;

export class SimpleScene extends Phaser.Scene {
	constructor(test) {
		super({
			key: 'GameScene'
		});
	}
	preload() {
		this.load.image('coin', 'assets/coinGold.png');
		this.load.atlas('player', 'assets/player.png', 'assets/player.json');


		//----------------------------------------------------------------------
		this.load.tilemapTiledJSON('map', 'assets/tilemap/map/test2.json');
		this.load.spritesheet('basic', 'assets/tilemap/texture/basic.png', {frameWidth: 32, frameHeight: 32});

		//this.load.tilemapTiledJSON('map', 'assets/map.json');
		//this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

		this.load.spritesheet('playerDino', 'assets/wizard_dino.png', {
			frameWidth: 25,
			frameHeight: 25,
			spacing: 0
		});

	}

	create() {
		this.map = this.make.tilemap({key: 'map'});
		console.log("see map", map);
		// tiles for the ground layer
		this.groundTiles = this.map.addTilesetImage('basic');
		// create the ground layer
		this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0);

		console.log("golden");
		// the player will collide with this layer
		this.groundLayer.setCollisionByExclusion([-1]);

		// set the boundaries of our game world
		this.physics.world.bounds.width = this.groundLayer.width;
		this.physics.world.bounds.height = this.groundLayer.height;

		this.player = this.physics.add.sprite(25, 25, 'playerDino').setScale(2);
		this.player.setBounce(0.2); // our player will bounce from items
		this.player.setCollideWorldBounds(true); // don't go out of the map

		this.physics.add.collider(this.groundLayer, this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor('#ccccff');
		this.anims.create({
    	key: 'idle',
    	frames: this.anims.generateFrameNumbers('playerDino', { start: 11, end: 11 }),
    	frameRate: 10,
    	repeat: -1
		});

		this.anims.create({
    	key: 'walk',
    	frames: this.anims.generateFrameNumbers('playerDino', { start: 21, end: 26}),
    	frameRate: 10,
    	repeat: -1
		});


		console.log("test");


	}

	update(time, delta) {
    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-300); // move left
        this.player.anims.play('walk', true); // play walk animation
        this.player.flipX= false; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(300); // move right
        this.player.anims.play('walk', true); // play walk animatio
        this.player.flipX =true; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
    }
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()){
       	this.player.body.setVelocityY(-500); // jump up
			console.log("see player", this.player);
		}

	}

}
