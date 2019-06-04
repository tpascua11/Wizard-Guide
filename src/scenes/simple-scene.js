var map;

import {LoadResources} from "../resource/resourceAll";
import {AnimationSet} from "../resource/AnimationSet";
import {SetupCollisionEvent} from "../mechanics/damageBox";
import {CreatePlayerAnimation} from "../player/playerAnimate";
import Player from "../player/player";
import BubbleAlert from "ROOT/mechanics/bubble";
import {SetupBubbleGroup} from "ROOT/mechanics/bubble";
import MapEvent from "ROOT/mechanics/mapEvent";
import {activateEvent} from "ROOT/mechanics/gameEvent";
import {callEvent} from "ROOT/mechanics/gameEvent";
import {SetupMapEvent} from "ROOT/mechanics/mapEvent";
import Slime from "../npc/slime";
import Basic from "../mechanics/basic";
import CollisionEvent from "../mechanics/damageBox";
import {NpcBox} from "../mechanics/monsterBox";

export class SimpleScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene'
		});
    //Phaser.Scene.call(this, { key: 'sceneA' });
	}

	preload() {
		LoadResources(this);
	}

	create() {
		//this.gameEventAction = new GameEventAction(true);
    this.universalTime = 0;
		this.time.addEvent({ delay: 500, callback: this.timeTick, callbackScope: this, loop: true });
		AnimationSet(this);
		this.playerSetup();
		this.keyEvents();
		SetupCollisionEvent(this);
		this.physics.add.overlap(this.player, this.collisionStorage, this.collisionEffect, this.collisionCause, this);
		this.setNewMap("map");
		SetupBubbleGroup(this);
	}

	playerSetup(){
		//Player Information
		CreatePlayerAnimation(this);
		this.player = new Player(this, 150, 0);
	}

	setNewMap(mapName){

		if(this.map) this.clearCurrentMap();

		this.map = this.make.tilemap({key: mapName});
		this.groundTiles = this.map.addTilesetImage('basic'); // tiles for the ground layer
		this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0); // create the ground layer
		this.groundLayer.setCollisionByExclusion([-1]); // the player will collide with this layer
		console.log(`%c Ground Layer`, 'color: brown', this.groundTiles);
		// set the boundaries of our game world
		this.physics.world.bounds.width = this.groundLayer.width;
		this.physics.world.bounds.height = this.groundLayer.height;
		// set bounds so the camera won't go outside the game world
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); 
		// set background color, so the sky is not black
		this.cameras.main.setBackgroundColor('#ccccff');

		//this.player.on('animationcomplete', this.test, this);
		// Enemy Group
		console.log(`%c ---------------------- Check`, 'color: red');
		console.log(`%c ---------------------- Check`, 'color: red');
		this.enemyGroup = this.add.group();
		this.eventGroup = this.add.group();
		this.eventGroup.runChildUpdate = true;
		console.log(`%c ---------------------- Check`, 'color: red');
		console.log(`%c ---------------------- Check`, 'color: red');

		this.map.getObjectLayer('Enemies').objects.forEach(
			(enemy) => {
				console.log("enemy", enemy);
				NpcBox(this, enemy);
			}
		);

		this.map.getObjectLayer('Event').objects.forEach(
			(mapEvent) => {
				console.log(`%c mapEvent`, 'color: green', mapEvent);

				let newConfig = {
					x: 600,
					y: mapEvent.y,
					scene: this,
					key: "attackDebug"
				}
				let newEvent = new MapEvent(newConfig);
				newEvent.displayWidth = 100;
				newEvent.displayHeight = 200;
				newEvent.setAlpha(0.5);
				this.eventGroup.add(newEvent);
				activateEvent(this, mapEvent.properties.dialogText);
			}
		);

		this.physics.add.overlap(this.player, this.eventGroup, this.eventCollision, this.eventCause, this);

		this.groundLayerCollidePlayer = this.physics.add.collider(this.groundLayer, this.player);
		this.groundLayerCollideEnemyGroup = this.physics.add.collider(this.groundLayer, this.enemyGroup);
		//this.physics.add.overlap(this.player, this.enemyGroup, this.interaction, null, this);
		this.collisionOverlapEnemyGroup = this.physics.add.overlap(this.enemyGroup, this.collisionStorage, this.collisionEffect, this.collisionCause, this);
		console.log("cool?", this.enemyGroup);
	}

	clearCurrentMap(){
		this.groundLayerCollidePlayer.destroy();
		this.groundLayerCollideEnemyGroup.destroy();
		this.groundLayer.destroy();
		this.enemyGroup.clear(true,true);
		this.collisionOverlapEnemyGroup.destroy();

	}

	keyEvents(){
		this.clearEvent = {activate: function(){console.log("no current event")}};
		this.currentEvent = this.clearEvent;
		this.cursors = this.input.keyboard.createCursorKeys();
		this.input.keyboard.on('keydown_E', function (event) {
			this.scene.currentEvent.activate();
		});
		this.input.keyboard.on('keydown_SPACE', function (event) {
			/*
			if(this.scene.bubble.canSkipCutscene){
				this.scene.setNewMap("map");
			}
			*/
			let template = {
				dialogText: "Hello Dragon Wizard",
				referenceScene: this.scene,
				triggerEvent: function(){
					console.log("Trigger Event", referenceScene);
				}
			}
			this.scene.scene.pause();
			this.scene.scene.resume("DialogBox");
			this.scene.scene.get("DialogBox").newMenu("DIALOG", template);
			//console.log("See Scene", this.scene.scene.get("DialogBox").backgroundUI.setAlpha(0.9));
		});
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
		//console.log("collision hits", collision.state.currentHits);
		targets.takeDamage(1);
	}

	eventCollision(targets, mapEvent){
		mapEvent.overlapUpdate(this);
	}

	eventCause(targets, mapEvent){
		//mapEvent
		//console.log("??");
	}

	collisionCause(targets, collision){
		if(collision.active && targets.active) return true;
		else return false;
	}

	update(time, delta) {
		//console.time("UPDATE");
		this.player.updateState(this);
		this.player.updateStatus();

		if(this.enemyGroup.children){
			this.enemyGroup.children.entries.forEach(function(npc){
				if(npc.active) npc.newProcessAI(this);
			}, this);
		}
		//console.timeEnd("UPDATE");
	}

}
