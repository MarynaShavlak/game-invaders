function createPlanet() {
  const planet = createPlanetElement();
  setTimeout(() => {
    setRandomPosition(planet);
  }, 100);
  gameElementsBlock.appendChild(planet);
  startItemMovement(planet);
}

function createPlanetElement() {
  let skin = 'skin-' + randomCoordinate(1, 4);
  const planet = document.createElement('div');
  planet.className = 'planet ' + skin;
  return planet;
}

function setRandomPosition(item) {
  const itemWidth = item.offsetWidth;
  const left = randomCoordinate(100, gameFieldWidth - itemWidth - 100);
  item.style.left = left + 'px';
}

function startItemMovement(planet) {
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
