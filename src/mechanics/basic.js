/*
 Building Block Of Everything (Player, NPCs, Items, Platform)
 */

export default class Basic extends Phaser.GameObjects.Sprite {

  /**
   * Intialization
   */
  constructor(config) {
    super(config.scene, config.x, config.y - 16, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.alive = true;
    // start still and wait until needed
    this.body.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(false);

    // Standard sprite is 16x16 pixels with a smaller body
    //this.body.setSize(12, 12);
    //this.body.offset.set(10,12);
    this.targetEnemy = null;
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
        maxVelocity: 500,
        hasJumped: false,
        isInAir: false,
      };
    }
  }
  /**
   * Stat Change
   */
  setHealth(health){
    this.stats.health = health
  }
  changeHealthBy(value){
    this.stats.health += value;
  }
  setMana(mana){
    this.stats.mana = mana;
  }
  changeManaBy(value){
    this.stats.mana += value
  }
  /**
   * Movment
   */
  doMovement(){
  }
  groundMovement(){
    if(this.stats.direction){
      if(this.velocity >= this.stats.maxVelocity){
        this.velocity += this.stats.acceleration;
        if(this.velocity >= this.stats.maxVelocity){
          this.velocity = this.stats.maxVelocity;
        }
      }
    }
    else {
      if(this.velocity >= this.stats.maxVelocity){
        this.velocity += this.stats.acceleration;
        if(this.velocity >= this.stats.maxVelocity){
          this.velocity = this.stats.maxVelocity;
        }
      }
    }
  }
  flyMovement(){}
  follow(){}

};
