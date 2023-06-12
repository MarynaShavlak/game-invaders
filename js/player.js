let playerEl = null;

document.onkeydown = function (e) {
  switch (e.code) {
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'Space':
      makeShot();
      break;
  }
};

function moveLeft() {
  if (playerEl.offsetLeft - 30 >= 30) {
    playerEl.style.left = playerEl.offsetLeft - 30 + 'px';
  }
}
function moveRight() {
  const gameFieldWidth = document.querySelector('body').offsetWidth;

  if (playerEl.offsetLeft + playerEl.offsetWidth + 30 <= gameFieldWidth - 30) {
    playerEl.style.left = playerEl.offsetLeft + 30 + 'px';
  }
}

function makeShot() {
  let bulletEl = document.createElement('div');
  bulletEl.classList.add('bullet');
  bulletEl.style.top = player.offsetTop + 'px';
  bulletEl.style.left = player.offsetLeft + player.offsetWidth / 2 + 'px';
  appEl.appendChild(bulletEl);
  let timerID = setInterval(() => {
    const isEnemyKilled = isTargetHit(bulletEl, 'enemy');
    const isAsteroidRuined = isTargetHit(bulletEl, 'asteroid');
    const isBulletOutField = bulletEl.offsetTop < 0;
    if (isEnemyKilled || isBulletOutField || isAsteroidRuined) {
      bulletEl.remove();
      clearInterval(timerID);
    }
    bulletEl.style.top = bulletEl.offsetTop - 10 + 'px';
  }, 100);
}

function createPlayer(skin) {
  playerEl = document.createElement('div');
  playerEl.className = skin;
  playerEl.id = 'player';
  appEl.appendChild(playerEl);
}
