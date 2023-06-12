function createEnemy() {
  const gameFieldWidth = document.querySelector('body').offsetWidth;
  const left = randomCoordinate(150, gameFieldWidth - 150);
  const enemyEl = document.createElement('div');
  enemyEl.className = 'enemy skin1';
  enemyEl.style.left = left + 'px';
  appEl.appendChild(enemyEl);
  moveEnemy(enemyEl);
}

function moveEnemy(enemy) {
  let timerID = setInterval(() => {
    enemy.style.top = enemy.offsetTop + 4 + 'px';
    const isEnemyOutField =
      enemy.style.top > document.querySelector('body').offsetHeight;
    if (isEnemyOutField) {
      enemy.remove();
      clearInterval(timerID);
    }
  }, 1);
}
