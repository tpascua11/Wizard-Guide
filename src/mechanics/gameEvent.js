export class GameEventAction {
	constructor(){
	}

	activateEvent(scene, textCode){
    console.log("text code test", textCode);
		let newLineList = textCode.split('↵');

		var eventList = [];

		newLineList.forEach(function(newLine){
			console.log(newLine.split(" "));
			eventList.push(newLine.split(" "));
		});
    console.log(`%c New Lines `, eventList, 'color: green');
/*
		eventList.forEach(function (eventRow){
			this.callEvent(scene, eventRow);
		});
*/
	}

	callEvent(scene, eventRow){
		switch(eventRow[0]){
			case '%p':
				eventRow.forEach(function(event, index){
					if(index == 0) console.log("ACTIVATE PICTURE");
					else console.log(event);
				});
				break;
			case '%d':
				eventRow.forEach(function(event, index){
					if(index == 0) console.log("ACTIVATE DIALOG");
					else console.log(event);
				});
				break;
			default: console.log(eventRow.join(' ')); break;
		}

	}

}

export function makeEventList(textCode){
  //Converts Text Code Into An Event List
  let newLineList = textCode.split('\n');
  var eventList = [];
  newLineList.forEach(function(newLine){
    eventList.push(lineReader(newLine));
  });

  function lineReader(line){
    let lineSplit = line.split(" ");
    return lineSplit;
  }

  return eventList;
}

export function nextDialogueEvent(gameEvent, textCode){
  let nextEvent = textCode.shift();
  callEvent(gameEvent, nextEvent);
}

export function activateEvent(scene, textCode){
  console.log("new text code\n", textCode);
  let newLineList = textCode.split('\n');
  var eventList = [];
  console.log(`%c Test Code Seperation`, 'color: blue');

  newLineList.forEach(function(newLine){
    eventList.push(lineReader(newLine));
  });
  console.log(`%c Event Lines `, 'color: green', eventList);

  eventList.forEach(function (eventRow){
    callEvent(scene, eventRow);
  });


  function lineReader(line){
    let lineSplit = line.split(" ");
    return lineSplit;
  }


}

export function callEvent(scene, eventRow){
  switch(eventRow[0]){
    case '%t':
      eventRow.forEach(function(event, index){
        if(index == 0) console.log("Transfer");
        else console.log(event);
      });
      break;
    case '%p':
      eventRow.forEach(function(event, index){
        if(index == 0) console.log("ACTIVATE PICTURE");
        else console.log(event);
      });
      break;
    case '%d':
      eventRow.forEach(function(event, index){
        if(index == 0) console.log("ACTIVATE DIALOG");
        else console.log(event);
      });
      break;
    default: console.log(eventRow.join(' ')); break;
  }
}
