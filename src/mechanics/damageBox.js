import Basic from '../mechanics/basic';

export default class CollisionEvent extends Basic {
  /**
   * Intialization
   */
  constructor(scene, info, user, projectile) {
    var config = {
      x: info.x,
      y: info.y,
      scene: scene,
      key: "attackDebug"
    }
    super(config);
    console.log("Creating Collision Effect", this);

    this.defaultState();
    this.defaultStats();

    //this.setScale(1);
    this.alpha = 0.2;
    this.body.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.setSize(100,100, false);
    this.state.nextUpdateCount = 0;
    //this.startFollow(scene.player);
    /*
     *
    this.update = function(){
      console.log("...");
    }*/
    this.config = {
      updateLimit: 1,
      currentHits: 1,
    };

  }

  defaultState(state){
    if(state) this.state = Object.assign({}, src);
    else{
      this.state = {
        direction: 1,
        moveSwap: false,
        movingRight: true,
        movingLeft: false,
        currentVelocity: 0,
        hasJumped: false,
        isInAir: false,
        is_aggroed: false,
        delay: false,
        delayMovement: false,
        delayAction: false,
        lastTargetDirection: 0,
        currentHits: 0,
        currentUpdateCount: 0
      };
    }
  }

  defaultStats(stats) {
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
        is_aggroed: false,
        will_aggro: false,
        aggroRangeX: 100,
        aggroRangeY: 100,
        stopRangeX: 25,
        delay: false,
        gravityMax: 700
      };
    }
  }


  /**
   * Call Upon
   */
  attach(target){}
  singleFrame(){}
  singleCollision(){}
  limitFrame(frameCount){}
  limitCollision(collisionCount){}
  activate(config){
    var nextUpdateCount = 0;
    this.config = config;
  }

  recycle(){
    //this.config.user = null;
    this.active = false;
    this.user = null;
    //this.body.reset(-250,-250);
  }

  /**
   * Update
   */
  CollisionEvent (scene){
    //console.log("test calls");
  }

  newProcess(){
    if(this.state.updateLimit <= this.state.nextUpdateCount){
      console.log("Update Count Reaches Max, Recyling Collision");
      this.recycle();
    }
    else if(this.state.hitLimit <= this.state.currentHits){
      console.log("Current Hits Reach its Limit Max, Recyling Collision");
      this.recycle();
    }
    else if(this.state.followUser){
      //console.log("following User");
      //this.body.x = this.user.body.x;
      //this.body.y = this.user.body.y;
      this.setX(this.user.body.x);
      this.setY(this.user.body.y);
    }
    //var bullet = bullets.get();
    this.state.nextUpdateCount++;
  }

  update(){
    this.newProcess();
  }

};
export function SetupCollisionEvent(scene){
  scene.collisionStorage = scene.add.group();
  scene.collisionStorage.runChildUpdate = true;

  scene.collisionStorage.update = function(){
    console.log("1");
  }

	var info = {x: 100, y: 300};
  for(var i = 0; i < 2; i++){
    var newCollision =  new CollisionEvent(scene, info);
    scene.collisionStorage.add(newCollision);
    scene.collisionStorage.killAndHide(newCollision);
  }

  console.log("Collision Group", scene.collisionStorage);

  scene.createCollision = function(config){
    var collision = this.collisionStorage.getFirstDead(false, config.x, config.y);
    collision.user = config.user;
    collision.state.followUser = config.followUser;
    collision.state.updateLimit = config.updateLimit;
    collision.state.hitLimit = config.hitLimit;

    collision.active = true;
    collision.state.currentHits = 0;
    collision.state.nextUpdateCount = 0;

    return collision;
  }
}
//NOTES
  //this.test = new CollisionEvent(this, info);
  /*
    this.collisionStorage = this.add.group({
        classType: CollisionEvent,
        maxSize: 30,
        runChildUpdate: false
    });
    */


