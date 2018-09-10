
/**
 * Slime Base
 *  contains the animation, physics, and action of the player
 */


import Basic from '../mechanics/basic';

export default class Slime extends Basic{
  /**
   * Intialization
   */
  constructor(scene, x, y) {
    var config = {
      key: "slimeTemplate",
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

  /**
   * State
   */
  updateState(scene){
  }
  /**
   * Movement
   */
  /**
   * Action
   */



}

