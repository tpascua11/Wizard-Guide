
/**
 * Slime Base
 *  contains the animation, physics, and action of the player
 */


import AI from '../mechanics/ai';

export default class Slime extends AI{
  /**
   * Intialization
   */
  constructor(scene, enemyInfo) {
    var config = {
      key: "slimeTemplate",
      x: enemyInfo.x,
      y: enemyInfo.y,
      scene: scene
    }
    super(config);

    this.init(scene, enemyInfo)
  }

  init(scene, enemyInfo){
    scene.physics.world.enable(this);
		//this.setDisplaySize(enemyInfo.width*3, enemyInfo.height*3);
    this.body.setSize(enemyInfo.width/3, enemyInfo.height/3, false);
    this.body.setOffset(0, enemyInfo.height-18);
    this.setScale(3);
    this.body.setBounce(0);
    this.body.setCollideWorldBounds(true);
    this.newStats();
    this.anims.play('slimeDo', true);

		this.animationEventSetup();

		this.newStats();
  }

	animationEventSetup(){
		this.on('animationcomplete', function (anim, frame) {
		  this.emit('animationcomplete_' + anim.key, anim, frame);
		}, this);

		this.on('animationcomplete_slimeJump', function () {
    	this.anims.play('slimeDo', true);
			this.body.velocity.x = 50 * this.state.targetDirection;
			console.log("JUMP COMPLETE");
		});

		/*
		this.once = 0;
		this.on('animationupdate', function (anim, frame) {
			if(!this.once){
				console.log("bypass", anim);
				this.once = true;
			}
		}, this);
		*/
	}

	dynamicAnimationEvent(){
		//make animation

	}
  newStats() {
		this.stats.willAggro = true;
		this.stats.aggroRangeX = 200;
		this.stats.aggroRangeY = 100;
  }

  /**
   * State
   */
  updateState(scene){
  }

  hi(scene, player){
    //this.body.setAllowGravity(false);
    //scene.physics.moveToObject(this, player, 500);
  }

  /**
   * Action_Animation
   */
  /**
   * Action
   */
	doNaturalAction(scene){
		this.body.velocity.y -= 500;
		this.body.velocity.x += 200 * this.state.lastTargetDirection;
		this.delayNextAction(scene, 3);
		this.delayNextMovement(scene, 5);
		this.stats.resetVelocityOnLand = true;
	}

	doNaturalMovement(){
		this.body.velocity.x = 0;
	}

	doAggroMovement(){
		this.body.velocity.x = 0;
		//this.body.velocity.x = 50 * this.state.targetDirection;
	}

	doAggroAction(scene){
		console.log("Slime Attack!");
		this.body.velocity.y -= 600;
		//this.body.velocity.x = 10000;
		this.body.velocity.x = 250 * this.state.targetDirection;
		this.delayNextAction(scene, 2);
    this.anims.play('slimeJump', true);
		this.delayNextMovement(scene, 1);
		this.stats.resetVelocityOnLand = true;

        var config = {
          x: this.body.x,
          y: this.body.y,
          updateLimit: 20,
          hitLimit: 1,
          user: this,
          followUser: true,
        };
        this.currentCollision = scene.createCollision(config);
	}

	regainAction(){
		console.log("I regain My Action");
    this.anims.play('slimeDo', true);
		this.stats.delay = false;
	}

	aggroOnReset(){
		//console.log("AGGRO IS ON");
		this.state.delayMovement = true;
	}

	aggroOffReset(){
		//console.log("AGGRO IS OFF");
		this.state.delayMovement = true;
	}

}

