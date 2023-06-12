function createAsteroid() {
  const asteroidEl = createTargetToHit('asteroid');
  moveTargetToHit(asteroidEl);
  // const gameFieldWidth = document.querySelector('body').offsetWidth;
  // const left = randomCoordinate(150, gameFieldWidth - 150);
  // const asteroidEl = document.createElement('div');
  // asteroidEl.className = 'asteroid';
  // asteroidEl.style.left = left + 'px';
  // appEl.appendChild(asteroidEl);
  // moveAsteroid(asteroidEl);
}

// function moveAsteroid(asteroid) {
//   let timerID = setInterval(() => {
//     asteroid.style.top = asteroid.offsetTop + 4 + 'px';
//     const isAsteroidOutField =
//       asteroid.offsetTop > document.querySelector('body').offsetHeight;
//     if (isAsteroidOutField) {
//       asteroid.remove();
//       clearInterval(timerID);
//     }
//   }, 1);
// }

// function removeAsteroid(asteroid) {
//   setTimeout(() => {
//     asteroid.remove();
//   }, 800);
// }
