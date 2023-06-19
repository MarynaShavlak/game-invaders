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
  if (playerEl.offsetLeft - 40 >= 30) {
    playerEl.style.left = playerEl.offsetLeft - 40 + 'px';
  }
}
function moveRight() {
  const gameFieldWidth = document.querySelector('body').offsetWidth;

  if (playerEl.offsetLeft + playerEl.offsetWidth + 40 <= gameFieldWidth - 30) {
    playerEl.style.left = playerEl.offsetLeft + 40 + 'px';
  }
}

function makeShot() {
  const playerType = playerEl.className;

  if (playerType === 'skin1') {
    let bulletEl = document.createElement('div');
    bulletEl.style.top = playerEl.offsetTop + 'px';
    bulletEl.className = 'bullet';
    bulletEl.classList.add('bullet-1');
    bulletEl.style.left = playerEl.offsetLeft + playerEl.offsetWidth / 2 + 'px';
    gameElementsBlock.appendChild(bulletEl);
    setBlasterSound();
    let timerID = setInterval(() => {
      const isEnemyKilled = isTargetHit(bulletEl, 'enemy');
      const isAsteroidRuined = isTargetHit(bulletEl, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(bulletEl);
      const isBulletOutField = bulletEl.offsetTop < 0;
      if (
        isEnemyKilled ||
        isBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        bulletEl.remove();
        clearInterval(timerID);
      }
      bulletEl.style.top = bulletEl.offsetTop - 10 + 'px';
    }, 100);
  } else if (playerType === 'skin2') {
    let leftBullet = document.createElement('div');
    let rightBullet = document.createElement('div');
    leftBullet.style.top = playerEl.offsetTop + 'px';
    leftBullet.className = 'bullet';
    leftBullet.classList.add('bullet-2');
    rightBullet.style.top = playerEl.offsetTop + 'px';
    rightBullet.className = 'bullet';
    rightBullet.classList.add('bullet-2');

    leftBullet.style.left =
      playerEl.offsetLeft + playerEl.offsetWidth / 2 - 10 + 'px';
    rightBullet.style.left =
      playerEl.offsetLeft + playerEl.offsetWidth / 2 + 10 + 'px';
    gameElementsBlock.appendChild(leftBullet);
    gameElementsBlock.appendChild(rightBullet);

    setBlasterSound();
    let timerIDLeft = setInterval(() => {
      const isEnemyKilled = isTargetHit(leftBullet, 'enemy');
      const isAsteroidRuined = isTargetHit(leftBullet, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(leftBullet);
      const isLeftBulletOutField = leftBullet.offsetTop < 0;
      if (
        isEnemyKilled ||
        isLeftBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        leftBullet.remove();
        clearInterval(timerIDLeft);
      }
      leftBullet.style.top = leftBullet.offsetTop - 10 + 'px';
    }, 100);

    let timerIDRight = setInterval(() => {
      const isEnemyKilled = isTargetHit(rightBullet, 'enemy');
      const isAsteroidRuined = isTargetHit(rightBullet, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(rightBullet);

      const isRightBulletOutField = rightBullet.offsetTop < 0;
      if (
        isEnemyKilled ||
        isRightBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        rightBullet.remove();
        clearInterval(timerIDRight);
      }
      rightBullet.style.top = rightBullet.offsetTop - 10 + 'px';
    }, 100);
  } else if (playerType === 'skin3') {
    let leftBullet = document.createElement('div');
    let rightBullet = document.createElement('div');
    let centerBullet = document.createElement('div');
    leftBullet.style.top = playerEl.offsetTop + 'px';
    leftBullet.className = 'bullet';
    leftBullet.classList.add('bullet-3');
    rightBullet.style.top = playerEl.offsetTop + 'px';
    rightBullet.className = 'bullet';
    rightBullet.classList.add('bullet-3');
    centerBullet.style.top = playerEl.offsetTop + 'px';
    centerBullet.className = 'bullet';
    centerBullet.classList.add('bullet-3');

    leftBullet.style.left =
      playerEl.offsetLeft + playerEl.offsetWidth / 2 - 60 + 'px';
    rightBullet.style.left =
      playerEl.offsetLeft + playerEl.offsetWidth / 2 + 55 + 'px';
    centerBullet.style.left =
      playerEl.offsetLeft + playerEl.offsetWidth / 2 - 5 + 'px';
    gameElementsBlock.appendChild(leftBullet);
    gameElementsBlock.appendChild(rightBullet);
    gameElementsBlock.appendChild(centerBullet);

    setBlasterSound();
    let timerIDLeft = setInterval(() => {
      const isEnemyKilled = isTargetHit(leftBullet, 'enemy');
      const isAsteroidRuined = isTargetHit(leftBullet, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(leftBullet);
      const isLeftBulletOutField = leftBullet.offsetTop < 0;
      if (
        isEnemyKilled ||
        isLeftBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        leftBullet.remove();
        clearInterval(timerIDLeft);
      }
      leftBullet.style.top = leftBullet.offsetTop - 10 + 'px';
    }, 100);

    let timerIDRight = setInterval(() => {
      const isEnemyKilled = isTargetHit(rightBullet, 'enemy');
      const isAsteroidRuined = isTargetHit(rightBullet, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(rightBullet);

      const isRightBulletOutField = rightBullet.offsetTop < 0;
      if (
        isEnemyKilled ||
        isRightBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        rightBullet.remove();
        clearInterval(timerIDRight);
      }
      rightBullet.style.top = rightBullet.offsetTop - 10 + 'px';
    }, 100);
    let timerIDCenter = setInterval(() => {
      const isEnemyKilled = isTargetHit(centerBullet, 'enemy');
      const isAsteroidRuined = isTargetHit(centerBullet, 'asteroid');
      const isAdditionalLifeTaken = isAdditionalLifeHit(centerBullet);

      const isCenterBulletOutField = centerBullet.offsetTop < 0;
      if (
        isEnemyKilled ||
        isCenterBulletOutField ||
        isAsteroidRuined ||
        isAdditionalLifeTaken
      ) {
        centerBullet.remove();
        clearInterval(timerIDCenter);
      }
      centerBullet.style.top = centerBullet.offsetTop - 10 + 'px';
    }, 100);
  }
}

function createPlayer(skin) {
  playerEl = document.createElement('div');
  playerEl.className = skin;
  playerEl.id = 'player';
  gameElementsBlock.appendChild(playerEl);
}
