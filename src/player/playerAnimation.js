export function CreatePlayerAnimation(scene){
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 11, end: 11 }),
    frameRate: 25,
    repeat: -1
  });

  scene.anims.create({
    key: 'run',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 21, end: 26}),
    frameRate: 12,
    repeat: -1
  });

  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('playerDino', { start: 91, end: 94}),
    frameRate: 14,
    repeat: 1
  });
}
