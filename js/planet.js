function createPlanet() {
  const planet = createPlanetElement();
  setTimeout(() => {
    setRandomPosition(planet);
  }, 100);
  gameElementsBlock.appendChild(planet);
  startPlanetMovement(planet);
}

function createPlanetElement() {
  let skin = 'skin-' + randomCoordinate(1, 4);
  const planet = document.createElement('div');
  planet.className = 'planet ' + skin;
  return planet;
}

function setRandomPosition(planet) {
  console.dir(planet);
  const planetWidth = planet.offsetWidth;
  console.log('planetWidth: ', planetWidth);
  const left = randomCoordinate(100, gameFieldWidth - planetWidth);
  planet.style.left = left + 'px';
}

function startPlanetMovement(planet) {
  const timerID = setInterval(() => {
    const top = planet.offsetTop + 10;
    planet.style.top = top + 'px';
    if (top > gameFieldHeight) {
      clearInterval(timerID);
      planet.remove();
      const timeout = getRandomTimeout();
      setTimeout(createPlanet, timeout);
    }
  }, 10);
}
