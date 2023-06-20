let isBombedRuined = false;
let killedByBombEnemies = [];

function createBombElement() {
  const bomb = document.createElement('div');
  bomb.className = 'bomb';
  return bomb;
}

function createBomb() {
  if (isGameOver) return;
  console.log('create bomb');
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
  setBoomSound();
  const timeoutBomb = getRandomTimeout(1000, 5000);
  setTimeout(() => {
    bomb.remove();
    createBomb();
  }, timeoutBomb);
}

function createBombTerritory(x, y) {
  const ter = document.createElement('div');
  ter.className = 'bomb-territory';
  ter.style.position = 'absolute';
  ter.style.backgroundColor = 'red';
  ter.style.width = '300px';
  ter.style.height = '300px';
  ter.style.left = x - 110 + 'px';
  ter.style.top = y - 110 + 'px';
  ter.style.zIndex = 3;

  return ter;
}

function getAllExistingEnemiesAndLifes() {
  let enemiesAndLifes = [];
  const innerElements = gameElementsBlock.children;
  for (let i = 0; i < innerElements.length; i++) {
    let el = innerElements[i];
    const isEnemy = el.classList.contains('enemy');
    const isAsteroid = el.classList.contains('asteroid');
    const isBomb = el.classList.contains('bomb');
    const isAdditionalLife = el.classList.contains('additional-life');
    const isBoom = el.classList.contains('boom');
    if ((isEnemy || isAsteroid || isAdditionalLife || isBomb) && !isBoom) {
      enemiesAndLifes.push(el);
    }
  }
  return enemiesAndLifes;
}

function getEnemiesAndLifesToBeBombed(ter, enemiesAndLifes) {
  let closestEnemies = [];
  for (let i = 0; i < enemiesAndLifes.length; i++) {
    const el = enemiesAndLifes[i];
    const isIntersecting = checkIfIntersecting(ter, el);

    if (isIntersecting) {
      closestEnemies.push(el);
    }
  }

  return closestEnemies;
}

function getKilledByBombEnemies(enemiesAndLifesToBeBombed) {
  let killedByBombEnemies = [];

  for (let i = 0; i < enemiesAndLifesToBeBombed.length; i++) {
    const el = enemiesAndLifesToBeBombed[i];
    const isEnemy = el.classList.contains('enemy');
    const isAsteroid = el.classList.contains('asteroid');
    const isBomb = el.classList.contains('bomb');
    const isBoom = el.classList.contains('boom');

    if ((isEnemy || isAsteroid || isBomb) && !isBoom) {
      killedByBombEnemies.push(el);
    }
  }

  return killedByBombEnemies;
}

function handleEnemiesAndLifesToBeBombed(closestEnemies) {
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
}

function isBombHit(bulletEl) {
  const bombsList = document.querySelectorAll('.bomb');
  let ter;
  let allExistingEnemiesAndLifes = [];
  let enemiesAndLifesToBeBombed = [];
  for (let i = 0; i < bombsList.length; i++) {
    let bomb = bombsList[i];

    if (bomb) {
      let isHit = isBulletHitTarget(bulletEl, bomb);
      if (isHit) {
        const { x, y } = getCoordinatesAndDimensions(bomb);
        ter = createBombTerritory(x, y);
        gameElementsBlock.appendChild(ter);
        allExistingEnemiesAndLifes = getAllExistingEnemiesAndLifes();
        enemiesAndLifesToBeBombed = getEnemiesAndLifesToBeBombed(
          ter,
          allExistingEnemiesAndLifes,
        );
        ter.remove();
        isBombedRuined = true;
        if (enemiesAndLifesToBeBombed.length) {
          handleEnemiesAndLifesToBeBombed(enemiesAndLifesToBeBombed);
          setTimeout(() => {
            isBombedRuined = false;
          }, 800);
        }
        bomb.className = 'bomb explosion';
        handleBombRemoval(bomb);

        return true;
      }
    }
  }

  return false;
}
