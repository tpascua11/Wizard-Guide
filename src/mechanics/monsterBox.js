/**
 * Monster Imports
 */

import Slime from "../npc/slime";



export function NpcBox(scene, enemy){
      console.log("see key", JSON.stringify(enemy.properties));
      switch(enemy.properties.key){
        case "slime":
          console.log("TETST TT");
			  	    scene.enemyGroup.add(new Slime(scene, enemy));
              break;
        case "goblinStabber":
			  	    //scene.enemyGroup.add(new Slime(scene, enemy.x, enemy.y));
              break;
        case "goblinSlasher":
			  	    //scene.enemyGroup.add(new Slime(scene, enemy.x, enemy.y));
              break;
        case "goblinArcher":
			  	    //scene.enemyGroup.add(new Slime(scene, enemy.x, enemy.y));
              break;
        default:
          console.log("notnng -- ---");
          break;
      }
}
