let lifes = 5;
let isGameOver = false;
const lifesList = document.querySelector('.lifesList');

function showLifes() {
  lifesList.classList.remove('hidden');
}

function createNewLife() {
  const item = document.createElement('li');
  item.className = 'life-item';
  const icon = document.createElement('img');
  icon.alt = 'life';
  icon.src = 'images/life.png';
  item.appendChild(icon);
  return item;
}

function decreaseLifesQuantity() {
  lifes -= 1;
  const lifeItem = document.querySelector('.life-item');
  if (!lifeItem) return;
  lifeItem.remove();
  if (lifes <= 0) {
    endGame();
  }
}
function increaseLifesQuantity() {
  lifes += 1;
  const lifeItem = createNewLife();
  lifesList.appendChild(lifeItem);
}

function createLifeElement() {
  const life = document.createElement('div');
  life.className = 'additional-life';
  return life;
}

function createAdditionalLife() {
  const life = createLifeElement();
  setTimeout(() => {
    setRandomPosition(life);
  }, 100);
  gameElementsBlock.appendChild(life);
  moveAdditionalLife(life);
  // startItemMovement(life);
}

function moveAdditionalLife(life) {
  console.log('life: ', life);
  if (!life) return;
  let timerID = setInterval(() => {
    life.style.top = life.offsetTop + 20 + 'px';
    const isLifeOutField = life.offsetTop > gameFieldHeight;

    const lifeCoords = getCoordinatesAndDimensions(life);
    const playerCoords = getCoordinatesAndDimensions(playerEl);
    const isIntersecting = checkIfCoordinatesIntersect(
      playerCoords,
      lifeCoords,
    );
    console.log('isIntersecting: ', isIntersecting);

    if (isLifeOutField) {
      life.remove();
      const timeoutLife = getRandomTimeout();
      setTimeout(createAdditionalLife, timeoutLife);
      clearInterval(timerID);
    }
    if (isIntersecting) {
      increaseLifesQuantity();
      life.remove();
      const timeoutLife = getRandomTimeout();
      setTimeout(createAdditionalLife, timeoutLife);
      clearInterval(timerID);
    }
  }, 300);
}
