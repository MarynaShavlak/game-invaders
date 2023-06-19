const playerResultsBlock = document.querySelector('.player-results');
const levelEl = document.querySelector('.level');
const deadEl = document.querySelector('.dead');

function showLPlayerResultsBlock() {
  playerResultsBlock.classList.remove('hidden');
}

function increaseLevel(deathEnemiesQuantity) {
  let newLevel = Math.ceil(deathEnemiesQuantity / 10);
  return newLevel;
}

function increaseEnemySpeed() {
  enemySpeed += 2;
}

function updatePlayerResultsAndEnemySpeed() {
  let currentLevel = levelEl.innerHTML;
  deathEnemiesQuantity += 1;
  deadEl.innerHTML = deathEnemiesQuantity;

  if (deathEnemiesQuantity > 10) {
    let newLevel = increaseLevel(deathEnemiesQuantity);
    levelEl.innerHTML = newLevel;
    if (currentLevel != newLevel) {
      increaseEnemySpeed();
    }
  }
}
