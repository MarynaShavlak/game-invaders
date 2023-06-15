const startGameBlock = document.querySelector('.start-game');
const btnStartGame = document.querySelector('.start-button');
btnStartGame.onclick = onStartGame;

function onStartGame() {
  if (selectedSkinClass) {
    startGameBlock.style.display = 'none';
    createPlayer(selectedSkinClass);
    createEnemy();
    // createEnemy();
    // createEnemy();
    setBackgroundSound();
    showLifes();
  } else {
    alert('Please, chose your ship to start the game');
  }
}
