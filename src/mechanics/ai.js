/*
 Building Block Of Everything (Player, NPCs, Items, Platform)
 */

import Basic from '../mechanics/basic';

export default class AI extends Basic{
  /**
   * Intialization
   */
  constructor(config) {
    super(config);
    this.defaultStats();
    this.defaultState();
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
        lastTargetDirection: 0
      };
    }
  }

  /**
   * AI_Process
   */
  newProcessAI(scene){
    this.thinkAndReact(scene);
    this.gravityMax();
    this.landReset();
    if(this.state.is_aggroed){
      this.aggroState(scene);
    }
    else this.naturalState(scene);
  }

  aggroState(scene){
    //Will Do Action Based on Aggro State
    if(!this.state.delayMovement) this.doAggroMovement(scene);
    if(!this.state.delayAction)   this.doAggroAction(scene);
  }

  naturalState(scene){
    //if(!this.state.delayMovement ) this.doNaturalMovement(scene);
    if(!this.state.delayAction   ) this.doNaturalAction(scene);
  }

  thinkAndReact(scene){
    //This Will Set Booleans and conditions
    //withinAggroRange()
    if(this.stats.willAggro){
      if(this.withinAggroRange(scene.player)){
        if(!this.state.is_aggroed){
          this.aggroOnReset();
          //this.callAggroWarningBubble();
        }
        this.state.is_aggroed = true;
      }
      else{
        if(this.state.is_aggroed){
          this.aggroOffReset();
          this.state.lastTargetDirection = this.state.targetDirection;
          //this.callAggroOffBubble();
        }
        this.state.is_aggroed = false;
      }
    }
    if(this.state.delayAction){
      if(this.state.nextAction <= scene.universalTime){
        this.state.delayAction = false;
      }
    }
    if(this.state.delayMovement){
      if(this.state.nextMovement <= scene.universalTime){
        this.state.delayMovement= false;
      }
    }
  }

  death(){
    //Use this to return back to pool and be inactive for later use
  }
  /**
   * AI_Basic_Actions
   */
  withinAggroRange(target){
    if((target.body.x - this.body.x) > 0){
      this.state.targetDirection = 1;
    }
    else this.state.targetDirection= -1;
    let xDistance = target.body.x - this.body.x;
    if(xDistance < 0) xDistance *= -1;


    let yDistance = target.body.y - this.body.y;
    if(yDistance < 0) yDistance *= -1;

    if( (  xDistance <= this.stats.aggroRangeX)
          && (yDistance <= this.stats.aggroRangeY)) return true;
    else return false;
  }

	delayNextAction(scene, timeLength){
		this.state.delayAction = true;
		this.state.nextAction = scene.universalTime + timeLength;
	}

	delayNextMovement(scene, timeLength){
		this.state.delayMovement = true;;
		this.state.nextMovement = scene.univeralTime + timeLength;
	}

  /**
   * AI_Template_Actions
   */
  aggroAction(){}
  withinRangeAction(){}
  doNaturalAction(){}
  doNaturalMovement(){}
  doAggroAction(){}
  doAggroMovement(){}
  resetState(){}
  aggroReset(){}
  overlapAction(){}
	aggroOnReset(){}
	aggroOffReset(){}
  aggroActionReset(){}
  naturalActionReset(){}
  /**
   * Movement
   */
  doMovement(){
    // Makes the AI move at maxVelocity
    this.body.setVelocityX(this.stats.maxVelocity);
  }

  gravityEffect(){
    // sets gravity fall speed at gravity max
    if(this.body.velocity.y >= this.stats.gravityMax){
      this.body.velocity.y = this.stats.gravityMax;
    }
  }

  landReset(){
    //If stats.resetVelocityOnLand
    if(this.stats.resetVelocityOnLand){
      if(this.body.onFloor()){
        if(!this.stats.landSpeed){
          this.body.velocity.x = 0
        }
        else{
          this.body.velocity.x = this.stats.landSpeed;
        }
        this.stats.resetVelocityOnLand = false;
      }
    }
  }

  /**
   * Actions
   */
  aggroActionInfo(){
    this.aggroAttack = {
      collisionLimit: 1,
      time: -1,
      callCollisionOn: -1
    };
  }

  naturalActionInfo(){
    this.aggroAttack = {
      collisionLimit: 1,
      time: -1,
      callCollisionOn: -1
    };
  }

};
