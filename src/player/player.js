/**
 * Player Base
 *  contains the animation, physics, and action of the player
 */


import Basic from '../mechanics/basic';

export default class Player extends Basic{
  /**
r  * Intialization
   */
  constructor(scene, x, y) {
    var config = {
      key: "playerDino",
      x,
      y,
      scene: scene
    }
    super(config);

    this.init(scene)
  }

  init(scene){
    scene.physics.world.enable(this);
    this.setScale(3);
    this.body.setSize(10, 20, false);
    this.body.setOffset(5 , 5);
    this.body.setBounce(0);
    this.body.setCollideWorldBounds(true);
    //this.body.setDrag(100);

    scene.cameras.main.startFollow(this);

    this.defaultStat();
    this.setupControls(scene);
  }

  defaultStat(stats) {
    if(stats) this.stats = Object.assign({}, src);
    else{
      this.stats = {
        heatlh: 1,
        mana: 1,
        direction: 1,
        moveSwap: false,
        movingRight: true,
        movingLeft: false,
        currentVelocity: 0,
        maxVelocity: 350,
        acl: 25,
        hasJumped: false,
        isInAir: false
      };
    }
  }

  /**
   * Controls
   */
  setupControls(box){
    this.control = {};
    this.control.keyJump     = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.control.keyCast     = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.control.keyAttack1  = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.control.keyAttack2  = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.control.keyAttack3  = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

    this.control.keyBook     = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.control.keyLeft     = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.control.keyRight    = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.control.keyDown     = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.control.keyUp       = box.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }
  /**
   * State
   */
  updateState(scene){
    if(this.control.keyLeft.isDown)       this.moveLeft();
    else if(this.control.keyRight.isDown) this.moveRight();
    else {
      if(this.body.velocity.x < 0){
        this.body.setVelocityX(this.body.velocity.x + 25);
        if(this.body.velocity.x > 0){
          this.body.setVelocityX(0);
        }
        this.setOrigin(0.5, 0.5);
      }
      else if(this.body.velocity.x > 0){
        this.body.setVelocityX(this.body.velocity.x - 25);
        if(this.body.velocity.x < 0){
          this.body.setVelocityX(0);
        }
        this.setOrigin(0.7, 0.5);
      }
      //this.body.setVelocityX(0);
      this.anims.play('idle', true);
      this.is_running = 0;
    }

    if(Phaser.Input.Keyboard.JustDown(this.control.keyJump)){
      this.body.setVelocityY(-500); // jump up
      console.log("jump")
    }
  }
  /**
   * Movement
   */
  moveLeft(){
    //Walk State
    if(this.body.velocity.x > -(this.stats.maxVelocity)){
      console.log("walk");
      this.anims.play('walk', true);
      this.body.setVelocityX(this.body.velocity.x - this.stats.acl); // move left
      this.flipX= false; // flip the sprite to the left
      this.setOrigin(0.5, 0.5);
    }
    //Run State
    else {
      console.log("run");
      this.anims.play('run', true); // play walk animation
      this.setOrigin(0.7, 0.5);
    }
  }
  moveRight(){
    //Run State
    if(this.body.velocity.x < (this.stats.maxVelocity)){
      console.log("walk");
      this.anims.play('walk', true);
      this.body.setVelocityX(this.body.velocity.x + this.stats.acl); // move left
      this.flipX = true; // flip the sprite to the left
      this.setOrigin(0.7, 0.5);
    }
    //Run State
    else {
      console.log("run");
      this.anims.play('run', true); // play walk animation
      this.setOrigin(0.5, 0.5);
    }

  }

  /**
   * Action
   */



}

