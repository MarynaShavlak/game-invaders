function createBombElement() {
  const bomb = document.createElement('div');
  bomb.className = 'bomb';
  return bomb;
}

function createBomb() {
  if (isGameOver) return;
  const bomb = createBombElement();
  setTimeout(() => {
    setRandomPosition(bomb);
  }, 100);
  gameElementsBlock.appendChild(bomb);
  moveBomb(bomb);
}

function moveBomb(bomb) {
  if (!bomb) return;
  let timerID = setInterval(() => {
    bomb.style.top = bomb.offsetTop + 15 + 'px';
    const isBombOutField = bomb.offsetTop > gameFieldHeight;
    const isIntersecting = checkIfIntersecting(bomb, playerEl);
    if (isIntersecting) {
      decreaseLifesQuantity();
      handleBombRemoval(bomb);
      clearInterval(timerID);
    }
    if (isBombOutField) {
      handleBombRemoval(bomb);
      clearInterval(timerID);
    }
  }, 300);
}

function handleBombRemoval(bomb) {
  bomb.remove();
  const randomNumber = Math.random();
  const timeoutBomb = getRandomTimeout(3000, 50000);
  setTimeout(() => {
    if (randomNumber > 0.9) {
      createBomb();
      createBomb();
    } else {
      createBomb();
    }
  }, timeoutBomb);
}

function isBombHit(bulletEl) {
  const bombsList = document.querySelectorAll('.bomb');
  for (let i = 0; i < bombsList.length; i++) {
    let bomb = bombsList[i];

    if (bomb) {
      let isHit = isBulletHitTarget(bulletEl, bomb);
      if (isHit) {
        console.log('yes');
        // increaseLifesQuantity();
        // handleLifeRemoval(life);

        return true;
      }
    }
  }

  return false;
}
