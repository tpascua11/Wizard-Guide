var map;

import {LoadResources} from "../resource/resourceAll";
import {SetupCollisionEvent} from "../mechanics/damageBox";
import {CreatePlayerAnimation} from "../player/playerAnimate";
import Player from "../player/player";
import Slime from "../npc/slime";
import Basic from "../mechanics/basic";
import CollisionEvent from "../mechanics/damageBox";
import {NpcBox} from "../mechanics/monsterBox";

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

		this.player = new Player(this, 150, 0);

		this.physics.add.collider(this.groundLayer, this.player);
		this.cursors = this.input.keyboard.createCursorKeys();

		// set bounds so the camera won't go outside the game world
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); 

		// set background color, so the sky is not black
		this.cameras.main.setBackgroundColor('#ccccff');

		/* Save This For Example! get Sprite Sheet From Atlas
 		this.textures.addSpriteSheetFromAtlas(
        'testPlayer',
        {
            atlas: 'npcList',
            frame: 'wizard_dino',
            frameWidth: 25,
            frameHeight: 25
				}
		);*/

		CreatePlayerAnimation(this);
    this.anims.create({
			key: 'slimeDo',
			frames: this.anims.generateFrameNames('npcList', { prefix: 'SlimeIdle', start: 0, end: 5}),
    	frameRate: 5,
    	repeat: -1,
			onUpdate: this.test
		});
		this.anims.create({
			key: 'slimeJump',
			frames: this.anims.generateFrameNames('npcList', { prefix: 'SlimeJump', start: 0, end: 7}),
    	frameRate: 10,
    	repeat: 1,
			onUpdate: function(){ console.log("cool")}
		});
    this.anims.create({
			key: 'goblinStabber',
			frames: this.anims.generateFrameNames('npcList', { prefix: 'goblinDagger', start: 0, end: 5}),
    	frameRate: 10,
    	repeat: -1
		});
		//this.player.on('animationcomplete', this.test, this);
		// Enemy Group
		/*
		for(var i = 0; i < 5; i++){
			this.enemyGroup.add(new Slime(this, 10 + i * 200, 500, "new slime: " + i));
		}
		*/
		this.enemyGroup = this.add.group();
		console.log("see map", this.map);
		this.map.getObjectLayer('Enemies').objects.forEach(
			(enemy) => {
				console.log("enemy", enemy);
				NpcBox(this, enemy);
			}
		);

		SetupCollisionEvent(this);

		this.physics.add.collider(this.groundLayer, this.enemyGroup);
		this.physics.add.overlap(this.player, this.enemyGroup, this.interaction, null, this);
		this.physics.add.overlap(this.player, this.collisionStorage, this.collisionEffect, null, this);
		//this.physics.add.overlap(this.enemyGroup, this.collisionStorage, this.collisionEffect, null, this);


    this.universalTime = 0;
		this.time.addEvent({ delay: 500, callback: this.timeTick, callbackScope: this, loop: true });
	}

	timeTick(){
		this.universalTime++;
		//console.log("tick", this.universalTime);
	}

	interaction(player, npc){
		//console.log("TESTING");
		//npc.overlapAction(this, player);
	}

	collisionEffect(targets, collision){
		if(collision.active){
			collision.state.currentHits++;
			console.log("collision hits", collision.state.currentHits);
			targets.body.velocity.y -= 1000;
		}
	}

	fire(){
		console.log("Fire!");
	}

	update(time, delta) {
		this.player.updateState(this);
		//console.log("enemy Group", this.enemyGroup.children.entries);
		//console.log("this", this);
		this.enemyGroup.children.entries.forEach(function(npc){
			npc.newProcessAI(this);
		}, this);
		//this.test.body.x = this.player.body.x - 100;
		//this.test.body.y = this.player.body.y - 100;
    //console.log("2");
	}

}
