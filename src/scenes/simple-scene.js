var map;

import {LoadResources} from "../resource/resourceAll";
import {AnimationSet} from "../resource/AnimationSet";
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
		// set bounds so the camera won't go outside the game world
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); 
		// set background color, so the sky is not black
		this.cameras.main.setBackgroundColor('#ccccff');


		//Player Information
		AnimationSet(this);
		CreatePlayerAnimation(this);
		this.player = new Player(this, 150, 0);
		this.cursors = this.input.keyboard.createCursorKeys();

		//this.player.on('animationcomplete', this.test, this);
		// Enemy Group
		this.enemyGroup = this.add.group();
		console.log("see map", this.map);
		this.map.getObjectLayer('Enemies').objects.forEach(
			(enemy) => {
				console.log("enemy", enemy);
				NpcBox(this, enemy);
			}
		);

		SetupCollisionEvent(this);

		this.physics.add.collider(this.groundLayer, this.player);
		this.physics.add.collider(this.groundLayer, this.enemyGroup);
		//this.physics.add.overlap(this.player, this.enemyGroup, this.interaction, null, this);
		this.physics.add.overlap(this.player, this.collisionStorage, this.collisionEffect, this.collisionCause, this);
		this.physics.add.overlap(this.enemyGroup, this.collisionStorage, this.collisionEffect, this.collisionCause, this);

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
			collision.state.currentHits++;
			console.log("collision hits", collision.state.currentHits);
			targets.takeDamage(1);
	}

	collisionCause(targets, collision){
		if(collision.active && targets.active) return true;
		else return false;
	}

	fire(){
		console.log("Fire!");
	}

	update(time, delta) {
		this.player.updateState(this);
		this.player.updateStatus();
		//console.log("enemy Group", this.enemyGroup.children.entries);
		//console.log("this", this);
		this.enemyGroup.children.entries.forEach(function(npc){
			if(npc.active) npc.newProcessAI(this);
		}, this);
		//this.test.body.x = this.player.body.x - 100;
		//this.test.body.y = this.player.body.y - 100;
    //console.log("2");
	}

}
