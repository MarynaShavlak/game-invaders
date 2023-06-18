let lifes = 5;
let isGameOver = false;
const lifesList = document.querySelector('.lifesList');

function showLifes() {
  lifesList.classList.remove('hidden');
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

function createLifeElement() {
  const life = document.createElement('div');
  life.className = 'additional-life';
  return life;
}

function createAdditionalLife() {
  const life = createLifeElement();
  console.log('life : ', life);
  setTimeout(() => {
    setRandomPosition(life);
  }, 100);
  gameElementsBlock.appendChild(life);
  startItemMovement(life);
}
