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
  console.log('item: ', item);
  console.dir(item);
  const itemWidth = item.offsetWidth;
  console.log('itemWidth: ', itemWidth);
  const left = randomCoordinate(100, gameFieldWidth - itemWidth);
  item.style.left = left + 'px';
}

function startItemMovement(planet) {
  console.log('planet: ', planet);
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
