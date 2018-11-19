/**
 * Player Base
 *  contains the animation, physics, and action of the player
 */

import Basic from '../mechanics/basic';

export default class Player extends Basic{
  /**
   * Intialization
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

    this.defaultStats();
    this.defaultState()
    this.setupControls(scene);
  }

  defaultStats(stats) {
    if(stats) this.stats = Object.assign({}, src);
    else{
      this.stats = {
        heatlh: 3,
        mana: 25,
        maxVelocity: 350,
        maxRunSpeed: 350,
        runAcl: 50,
        jumpSpan: 33,
        jumpAcl: 15,
        jumpPower: -500,
        acl: 50,
        hasJumped: false,
        isInAir: false
      };
    }
  }

  defaultState(state){
    if(state) this.state = Object.assign({}, src);
    else{
      this.state = {
        direction: 1,
        moveSwap: false,
        movingRight: false,
        movingLeft: false,
        currentVelocity: 0,
        hasJumped: false,
        isInAir: false,
        onGround: false,
        has_jumped: false
      };
    }
  }

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
    this.state.onGround = this.body.onFloor();
    if(this.state.onGround){
      this.state.has_jumped = false;
    }
    this.gravityMax();

    if(this.control.keyLeft.isDown)       this.moveLeft();
    else if(this.control.keyRight.isDown) this.moveRight();
    else if(this.state.onGround && this.control.keyDown.isDown){
      this.anims.play('lay', true);
      this.stopMoving(50);
    }
    else if(this.state.onGround){
      this.stopMoving(25);
      //if(this.anims.currentAnim && (this.anims.currentAnim.key !== 'idle')){
        this.anims.play('idle', true);
      //}
      if(this.movingLeft)  this.setOrigin(0.5,0.5);
      if(this.movingRight) this.setOrigin(0.7,0.5);
    }

    if(Phaser.Input.Keyboard.JustDown(this.control.keyJump)){
      if(!this.state.onGround) this.spellJump();
      else this.jump();
    }
    else if(this.control.keyJump.isDown){
      this.boostJumping();
    }
  }

  /**
   * Movement
   */
  moveLeft(){
    this.movingLeft = true;
    this.movingRight = false;
    this.body.setSize(10, 20, false);
    //Walk State
    if(this.body.velocity.x > -(this.stats.maxVelocity)){
      if(this.state.onGround) this.anims.play('walk', true);
      this.body.setVelocityX(this.body.velocity.x - this.stats.runAcl); // move left
      this.flipX= false; // flip the sprite to the left
      this.setOrigin(0.5, 0.5);
    }
    //Run State
    else {
      if(this.state.onGround) this.anims.play('run', true); // play walk animation
      this.setOrigin(0.7, 0.5);
    }
  }

  moveRight(){
    this.movingLeft = false;
    this.movingRight = true;
    this.body.setSize(10, 20, false);
    //Run State
    if(this.body.velocity.x < (this.stats.maxVelocity)){
      if(this.state.onGround) this.anims.play('walk', true);
      this.body.setVelocityX(this.body.velocity.x + this.stats.runAcl); // move left
      this.flipX = true; // flip the sprite to the left
      this.setOrigin(0.7, 0.5);
    }
    //Run State
    else {
      //if(this.grounded) this.anims.play('walk', true);
      if(this.state.onGround) this.anims.play('run', true); // play walk animation
      this.setOrigin(0.5, 0.5);
    }
  }

  jump(){
      if(this.state.onGround){
        this.state.jumpCurrent = 0;
        this.anims.play('jump', true);
        this.body.setVelocityY(this.stats.jumpPower); // jump up
        this.state.has_jumped = true;
        console.log("jump");
      }
  }

  boostJumping(){
      if(!this.state.onGround){
        if(this.state.jumpCurrent <= this.stats.jumpSpan){
            this.body.velocity.y -= this.stats.jumpAcl;

            this.state.jumpCurrent++;
            console.log("jump span", this.state.jumpCurrent);
        }
      }
  }

  spellJump(){
      this.state.jumpCurrent = 0;
      this.anims.play('spellJump', true);
      this.body.setVelocityY(this.stats.jumpPower+100); // jump up
  }

  stopMoving(stopForce){
    if(this.body.velocity.x < 0){
      this.body.setVelocityX(this.body.velocity.x + stopForce);
      if(this.body.velocity.x > 0){
        this.body.setVelocityX(0);
      }
    }
    else if(this.body.velocity.x > 0){
      this.body.setVelocityX(this.body.velocity.x - stopForce);
      if(this.body.velocity.x < 0){
        this.body.setVelocityX(0);
      }
    }
  }


}

