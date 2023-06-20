let closestEnemies = [];

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
        const { x, y, width, height } = getCoordinatesAndDimensions(bomb);
        const ter = document.createElement('div');
        ter.style.position = 'absolute';
        ter.style.backgroundColor = 'red';
        ter.style.width = '300px';
        ter.style.height = '300px';
        ter.style.left = x - 110 + 'px';
        ter.style.top = y - 110 + 'px';
        ter.style.zIndex = 3;
        gameElementsBlock.appendChild(ter);
        console.dir(ter);

        console.log('height: ', height);
        console.log('width: ', width);
        console.log('y: ', y);
        console.log('x: ', x);

        let enemiesAndLifes = [];
        const innerElements = gameElementsBlock.children;
        for (let i = 0; i < innerElements.length; i++) {
          let el = innerElements[i];
          const isEnemy = el.classList.contains('enemy');
          const isAsteroid = el.classList.contains('asteroid');
          const isAdditionalLife = el.classList.contains('additional-life');
          if (isEnemy || isAsteroid || isAdditionalLife) {
            enemiesAndLifes.push(el);
            const isIntersecting = checkIfIntersecting(ter, el);
            if (isIntersecting) {
              closestEnemies.push(el);
            }
          }
        }
        console.log('closestEnemies: ', closestEnemies);

        // increaseLifesQuantity();
        // handleLifeRemoval(life);

        return true;
      }
    }
  }

  return false;
}
