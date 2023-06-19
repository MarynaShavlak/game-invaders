function createEnemy() {
  let enemyEl;
  const randomNumber = Math.random();
  if (randomNumber > 0.8) {
    enemyEl = createTargetToHit('enemy skin1');
  } else if (randomNumber < 0.5) {
    enemyEl = createTargetToHit('enemy skin2');
  } else {
    enemyEl = createTargetToHit('enemy skin3');
  }

  moveTargetToHit(enemyEl);
}
