import Basic from '../mechanics/basic';

export default class CollisionEvent extends Basic {
  /**
   * Intialization
   */
  constructor(scene, info) {
    var config = {
      x: info.x,
      y: info.y,
      scene: scene
    }
    super(config);
    this.setScale(10);
    this.body.setCollideWorldBounds(true);
    //this.startFollow(scene.player);
    this.update = function(){
      console.log("...");
    }
  }

  missle(config){
  }

};
