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

function createPlayer(skin) {
  playerEl = document.createElement('div');
  playerEl.className = skin;
  playerEl.id = 'player';
  gameElementsBlock.appendChild(playerEl);
}

function createBullet(className, topOffset, leftOffset) {
  let bulletEl = document.createElement('div');
  bulletEl.style.top = topOffset + 'px';
  bulletEl.className = 'bullet';
  bulletEl.classList.add(className);
  bulletEl.style.left = leftOffset + 'px';
  gameElementsBlock.appendChild(bulletEl);
  return bulletEl;
}

function handleBullet(bulletEl, target) {
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
    return true;
  }

  bulletEl.style.top = bulletEl.offsetTop - 10 + 'px';
  return false;
}

function shootSkin1(top, left) {
  const bulletEl = createBullet('bullet-1', top, left);
  setBlasterSound('bullet-1');
  const timerID = setInterval(() => {
    const shouldRemoveBullet = handleBullet(bulletEl);
    if (shouldRemoveBullet) {
      clearInterval(timerID);
    }
  }, 100);
}

function shootSkin2(top, left) {
  const leftBullet = createBullet('bullet-2', top, left - 10);
  const rightBullet = createBullet('bullet-2', top, left + 10);

  setBlasterSound('bullet-2');
  const timerIDLeft = setInterval(() => {
    const shouldRemoveLeftBullet = handleBullet(leftBullet);
    if (shouldRemoveLeftBullet) {
      clearInterval(timerIDLeft);
    }
  }, 100);

  const timerIDRight = setInterval(() => {
    const shouldRemoveRightBullet = handleBullet(rightBullet);
    if (shouldRemoveRightBullet) {
      clearInterval(timerIDRight);
    }
  }, 100);
}

function shootSkin3(top, left) {
  const leftBullet = createBullet('bullet-3', top, left - 60);
  const rightBullet = createBullet('bullet-3', top, left + 55);
  const centerBullet = createBullet('bullet-3', top, left - 5);

  setBlasterSound('bullet-3');
  const timerIDLeft = setInterval(() => {
    const shouldRemoveLeftBullet = handleBullet(leftBullet);
    if (shouldRemoveLeftBullet) {
      clearInterval(timerIDLeft);
    }
  }, 100);

  const timerIDRight = setInterval(() => {
    const shouldRemoveRightBullet = handleBullet(rightBullet);
    if (shouldRemoveRightBullet) {
      clearInterval(timerIDRight);
    }
  }, 100);

  const timerIDCenter = setInterval(() => {
    const shouldRemoveCenterBullet = handleBullet(centerBullet);
    if (shouldRemoveCenterBullet) {
      clearInterval(timerIDCenter);
    }
  }, 100);
}

function makeShot() {
  const playerType = playerEl.className;
  const initTopSettings = playerEl.offsetTop;
  const initLeftSettings = playerEl.offsetLeft + playerEl.offsetWidth / 2;

  if (playerType === 'skin1') {
    shootSkin1(initTopSettings, initLeftSettings);
  } else if (playerType === 'skin2') {
    shootSkin2(initTopSettings, initLeftSettings);
  } else if (playerType === 'skin3') {
    shootSkin3(initTopSettings, initLeftSettings);
  }
}
