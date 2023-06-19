const startGameBlock = document.querySelector('.start-game');
const btnStartGame = document.querySelector('.start-button');
const btnRestartGame = document.querySelector('.restart-button');
const btnStartNewGame = document.querySelector('.start-new-button');
btnStartGame.onclick = onStartGame;
btnRestartGame.onclick = onRestartGame;
btnStartNewGame.onclick = onRestartGame;
const timeoutPlanet = getRandomTimeout();
setTimeout(createPlanet, timeoutPlanet);

function onStartGame() {
  if (selectedSkinClass) {
    startGameBlock.style.display = 'none';
    createPlayer(selectedSkinClass);
    createEnemy();
    // createEnemy();
    // createEnemy();
    const timeoutLife = getRandomTimeout();
    setTimeout(createAdditionalLife, timeoutLife);
    setBackgroundSound();
    showLifes();
    showLPlayerResultsBlock();
  } else {
    alert('Please, chose your ship to start the game');
  }
}

function onRestartGame() {
  location.reload();
}
