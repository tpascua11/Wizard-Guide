var map;

import {LoadResources} from "../resource/resourceAll";
import {CreatePlayerAnimation} from "../player/playerAnimate";
import Player from "../player/player";
import Slime from "../npc/slime";
import Basic from "../mechanics/basic";

export class SimpleScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene'
		});
	}

	preload() {
		LoadResources(this);
	}

	create() {
		this.map = this.make.tilemap({key: 'map'});
		this.groundTiles = this.map.addTilesetImage('basic'); // tiles for the ground layer
		this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0); // create the ground layer
		this.groundLayer.setCollisionByExclusion([-1]); // the player will collide with this layer

		// set the boundaries of our game world
		this.physics.world.bounds.width = this.groundLayer.width;
		this.physics.world.bounds.height = this.groundLayer.height;

		this.player = new Player(this, 100, 10000);

		this.physics.add.collider(this.groundLayer, this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

		// set bounds so the camera won't go outside the game world
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); 

		// set background color, so the sky is not black
		this.cameras.main.setBackgroundColor('#ccccff');

		CreatePlayerAnimation(this);
		//this.player.on('animationcomplete', this.test, this);
		//
		//
		this.slime = new Slime(this, 200, 50);

		this.physics.add.collider(this.slime, this.player);
		this.physics.add.collider(this.groundLayer, this.slime);

		//this.physics.add.overlap(sprite, group);


	}

	test(animation, frame) {
		if(animation.key === 'walk'){
			this.player.is_running = true;
		}
	}

	update(time, delta) {
		this.player.updateState(this);
	}

}
