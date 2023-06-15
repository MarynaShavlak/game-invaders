let lifes = 5;
const lifesList = document.querySelector('.lifesList');

function showLifes() {
  lifesList.classList.remove('hidden');
}

function decreaseLifesQauntity() {
  lifes -= 1;
  const lifeItem = document.querySelector('.life-item');
  if (!lifeItem) return;
  lifeItem.remove();
  if (lifes <= 0) {
    console.log('end game');
  }
}
