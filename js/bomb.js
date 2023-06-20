let closestEnemies = [];
let isBombedRuined = false;
let killedByBombEnemies = [];

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
  const timeoutBomb = getRandomTimeout(100, 2000);
  setTimeout(() => {
    if (randomNumber > 0.4) {
      createBomb();
      createBomb();
    } else {
      createBomb();
    }
  }, timeoutBomb);
}

function isBombHit(bulletEl) {
  const bombsList = document.querySelectorAll('.bomb');
  let ter;
  for (let i = 0; i < bombsList.length; i++) {
    let bomb = bombsList[i];

    if (bomb) {
      let isHit = isBulletHitTarget(bulletEl, bomb);
      if (isHit) {
        const { x, y, width, height } = getCoordinatesAndDimensions(bomb);
        ter = document.createElement('div');
        ter.className = 'bomb-territory';
        ter.style.position = 'absolute';
        ter.style.backgroundColor = 'red';
        ter.style.width = '300px';
        ter.style.height = '300px';
        ter.style.left = x - 110 + 'px';
        ter.style.top = y - 110 + 'px';
        ter.style.zIndex = 3;
        gameElementsBlock.appendChild(ter);

        let enemiesAndLifes = [];
        const innerElements = gameElementsBlock.children;
        for (let i = 0; i < innerElements.length; i++) {
          let el = innerElements[i];
          const isEnemy = el.classList.contains('enemy');
          const isAsteroid = el.classList.contains('asteroid');
          const isAdditionalLife = el.classList.contains('additional-life');
          const isBoom = el.classList.contains('boom');
          if ((isEnemy || isAsteroid || isAdditionalLife) && !isBoom) {
            enemiesAndLifes.push(el);
            const isIntersecting = checkIfIntersecting(ter, el);
            if (isIntersecting) {
              closestEnemies.push(el);
            }
          }
        }
        for (let i = 0; i < closestEnemies.length; i++) {
          const el = closestEnemies[i];
          const isEnemy = el.classList.contains('enemy');
          const isAsteroid = el.classList.contains('asteroid');
          const isBoom = el.classList.contains('boom');
          console.log('isBoom : ', isBoom);
          if ((isEnemy || isAsteroid) && !isBoom) {
            killedByBombEnemies.push(el);
          }
        }
        console.log('killedByBombEnemies: ', killedByBombEnemies);
        ter.remove();
        isBombedRuined = true;
        console.log('closestEnemies: ', closestEnemies);
        if (closestEnemies.length) {
          for (let i = 0; i < closestEnemies.length; i++) {
            const element = closestEnemies[i];
            const targetType = element.className.split(' ')[0];
            const classTarget = element.className.split(' ')[1];
            if (targetType === 'additional-life') {
              increaseLifesQuantity();
              handleLifeRemoval(element);
            } else {
              handleTargetHit(element, targetType, classTarget);
            }
          }
          setTimeout(() => {
            isBombedRuined = false;
          }, 800);
        }
        handleBombRemoval(bomb);

        return true;
      }
    }
  }

  return false;
}
