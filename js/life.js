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
