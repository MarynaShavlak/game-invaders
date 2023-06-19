let lifes = 5;
let isGameOver = false;
const lifesList = document.querySelector('.lifesList');

function showLifes() {
  lifesList.classList.remove('hidden');
}
function createNewLifeInMenu() {
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
  const lifeItem = createNewLifeInMenu();
  lifesList.appendChild(lifeItem);
}
function createLifeElement() {
  const life = document.createElement('div');
  life.className = 'additional-life';
  return life;
}
function createAdditionalLife() {
  if (isGameOver) return;
  const life = createLifeElement();
  setTimeout(() => {
    setRandomPosition(life);
  }, 100);
  gameElementsBlock.appendChild(life);
  moveAdditionalLife(life);
}
function moveAdditionalLife(life) {
  if (!life) return;
  let timerID = setInterval(() => {
    life.style.top = life.offsetTop + 10 + 'px';
    const isLifeOutField = life.offsetTop > gameFieldHeight;

    const isIntersecting = checkIfIntersecting(life, playerEl);
    if (isIntersecting) {
      increaseLifesQuantity();
      handleLifeRemoval(life);
      clearInterval(timerID);
    }
    if (isLifeOutField) {
      handleLifeRemoval(life);
      clearInterval(timerID);
    }
  }, 300);
}
function handleLifeRemoval(life) {
  life.remove();
  const randomNumber = Math.random();
  const timeoutLife = getRandomTimeout();
  setTimeout(() => {
    if (randomNumber > 0.8) {
      createAdditionalLife();
      createAdditionalLife();
    } else {
      createAdditionalLife();
    }
  }, timeoutLife);
}
function isAdditionalLifeHit(bulletEl) {
  const lifesList = document.querySelectorAll('.additional-life');
  for (let i = 0; i < lifesList.length; i++) {
    let life = lifesList[i];
    if (life) {
      let isHit = isBulletHitTarget(bulletEl, life);
      if (isHit) {
        increaseLifesQuantity();
        handleLifeRemoval(life);

        return true;
      }
    }
  }

  return false;
}
