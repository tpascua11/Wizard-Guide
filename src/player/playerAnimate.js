export function CreatePlayerAnimation(scene){
  //Dinosaur Wizard Idle
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 11, end: 17 }),
    frameRate: 5,
    repeat: 0
  });

  //Dinosaur Wizard Running
  scene.anims.create({
    key: 'run',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 21, end: 26}),
    frameRate: 12,
    repeat: -1
  });

  //Dinosaur Wizard Jump
  scene.anims.create({
    key: 'jump',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 41, end: 44}),
    frameRate: 9,
    repeat: 0
  });

  //Dinosaur Wizard Jump
  scene.anims.create({
    key: 'spellJump',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 41, end: 44}),
    frameRate: 9,
    repeat: 0
  });

  //Dinosaur Wizard Lay
  scene.anims.create({
    key: 'lay',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 81, end: 81}),
    frameRate: 10,
    repeat: -1
  });

  //Dinosaur Wizard Walking
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 91, end: 94}),
    frameRate: 14,
    repeat: -1
  });

}
