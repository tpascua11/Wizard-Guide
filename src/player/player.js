/**
 * Player Base
 *  contains the animation, physics, and action of the player
 */

import Basic from '../mechanics/basic';
export default class Player extends Basic{
  /*
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
    this.setupHUD(scene);
  }

  defaultStats(stats) {
    if(stats) this.stats = Object.assign({}, src);
    else{
      this.stats = {
        currentHealth: 5,
        maxHeatlh: 10,
        currentMana: 10,
        maxMana: 10,
        maxVelocity: 350,
        maxRunSpeed: 350,
        runAcl: 50,
        jumpSpan: 33,
        jumpAcl: 15,
        jumpPower: -500,
        acl: 50,
        hasJumped: false,
        isInAir: false,
        regenAt: 40,
        currentRegen: 0,
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

  setupHUD(scene){
    this.healthHud = scene.add.sprite(35, 10, 'healthbarsheet');
    this.manaHud = scene.add.sprite(35, 18, 'manabarsheet');

    this.healthHud.setOrigin(0);
    this.manaHud.setOrigin(0);

    this.healthHud.setScale(1.7, 1.4);
    this.manaHud.setScale(1.7, 2);

    this.manaHud.setScrollFactor(0);
    this.healthHud.setScrollFactor(0);
  }

  /**
   * Stats and State Modifier
   */
  takeDamage(damage){
    var accessDamage = this.stats.currentMana - damage;
    this.stats.currentMana -= damage;
    if(accessDamage <= 0){
      this.stats.currentMana = 0;
      this.stats.currentHealth += accessDamage;
    }
    this.updatePlayerHUD();
  }

  modifierHealth(value){
    this.stats.currentHealth += value;
    var excess = this.stats.currentHealth;

    if(this.stats.currentHealth > this.stats.maxHealth){
      this.stats.currentHealth = this.stats.maxHealth;
    }
    else if(this.stats.currentHealth < 0){
      this.stats.currentHealth = 0;
    }
    this.updatePlayerHUD();
  }

  modifierMana(value){
    this.stats.currentMana += value;
    var excess = this.stats.currentHealth;

    if(this.stats.currentMana > this.stats.maxMana){
      this.stats.currentMana = this.stats.maxMana;
    }
    else if(this.stats.currentMana < 0){
      this.stats.currentMana = 0;
    }
    this.updatePlayerHUD();
  }

  /**
   * Update
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
      if(!this.state.onGround) this.spellJump(scene);
      else this.jump(scene);
    }
    else if(this.control.keyJump.isDown){
      this.boostJumping();
    }
  }

  updateStatus(){
    this.stats.currentRegen++;
    if(this.stats.currentRegen == this.stats.regenAt){
      //console.log("REGEN");
      this.modifierMana(1);
      this.stats.currentRegen = 0;
    }
  }

  updatePlayerHUD(){
    //console.log("Player Health", this.stats.currentHealth);
    //console.log("Player Mana  ", this.stats.currentMana);
    this.manaHud.setFrame(this.stats.currentMana);
    this.manaHud.alpha = 0.6;
    this.healthHud.setFrame(this.stats.currentHealth);
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

  jump(scene){
    if(this.state.onGround){
      this.state.jumpCurrent = 0;
      this.anims.play('jump', true);
      this.body.setVelocityY(this.stats.jumpPower); // jump up
      this.state.has_jumped = true;
      console.log("jump");
      //let test = scene.collisionStorage.getFirstDead(false, this.body.x, this.body.y);
      //test.active = true;
      //
    }
  }

  boostJumping(){
    if(!this.state.onGround){
      if(this.state.jumpCurrent <= this.stats.jumpSpan){
        this.body.velocity.y -= this.stats.jumpAcl;

        this.state.jumpCurrent++;
        //console.log("jump span", this.state.jumpCurrent);
      }
    }
  }

  spellJump(scene){
    if(this.stats.currentMana <= 0) return;
    this.state.jumpCurrent = 0;
    this.anims.play('spellJump', true);
    this.body.setVelocityY(this.stats.jumpPower+100); // jump up
    var config = {
      x: this.body.x,
      y: this.body.y,
      updateLimit: 1,
      hitLimit: 2,
      user: this,
      followUser: true,
    };
    this.currentCollision = scene.createCollision(config);
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

