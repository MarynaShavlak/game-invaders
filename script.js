/**
 * 1. Реалызувати рух гравця за допомогою натискання клавіш
 * 2. Зробити постріли :
 * - зробити кулю
 * - зробити рух кулі
 * - перевірити чи потрапила куля у ціль
 *
 * 3. Реалізувати вибір гравця та запуск гри
 * 4. Створити ворогіа та їх рух
 * 5. Створити рахунок життів
 * 6. Якщо ворог пройшов гравця, відніти життя
 * 7. Якщо життя закінчилось, то закінчити гру
 *
 *
 */

const gameElementsBlock = document.querySelector('.game-elements');
const endGameBlock = document.querySelector('.end-game');
const firstSkin = document.querySelector('.skin1');
const secondSkin = document.querySelector('.skin2');
const thirdSkin = document.querySelector('.skin3');

firstSkin.onclick = onSkinClick;
secondSkin.onclick = onSkinClick;
thirdSkin.onclick = onSkinClick;
let selectedSkinClass;

function onSkinClick(e) {
  const selectedSkin = e.currentTarget;
  selectedSkinClass = selectedSkin.className.split(' ')[1];
  firstSkin.classList.remove('active');
  secondSkin.classList.remove('active');
  thirdSkin.classList.remove('active');
  selectedSkin.classList.add('active');
}

function randomCoordinate(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function createTargetToHit(className) {
  if (isGameOver) return;
  const gameFieldWidth = document.querySelector('body').offsetWidth;
  const left = randomCoordinate(150, gameFieldWidth - 150);
  const targetToHitEl = document.createElement('div');
  targetToHitEl.className = className;
  targetToHitEl.style.left = left + 'px';
  gameElementsBlock.appendChild(targetToHitEl);
  return targetToHitEl;
}

function moveTargetToHit(target) {
  if (!target) return;
  let timerID = setInterval(() => {
    target.style.top = target.offsetTop + 30 + 'px';
    const isTargetOutField =
      target.offsetTop > document.querySelector('body').offsetHeight;

    const targetCoords = getCoordinatesAndDimensions(target);
    const playerCoords = getCoordinatesAndDimensions(playerEl);
    const isIntersecting = checkIfCoordinatesIntersect(
      playerCoords,
      targetCoords,
    );
    if (isTargetOutField) {
      target.remove();
    }
    if (isIntersecting || isTargetOutField) {
      decreaseLifesQuantity();
      createNewTarget();
      target.remove();
      clearInterval(timerID);
    }
  }, 300);
}

function removeTargetToHit(target) {
  setTimeout(() => {
    target.remove();
    createNewTarget();
  }, 800);
}

function isTargetHit(bulletEl, targetType) {
  const targetsList = document.querySelectorAll('.' + targetType);
  for (let i = 0; i < targetsList.length; i++) {
    let target = targetsList[i];
    let isTargetExist = target && !target.classList.contains('boom');
    if (isTargetExist) {
      let top =
        bulletEl.offsetTop > target.offsetTop &&
        bulletEl.offsetTop < target.offsetTop + target.offsetHeight;
      let left =
        bulletEl.offsetLeft > target.offsetLeft &&
        bulletEl.offsetLeft < target.offsetLeft + target.offsetWidth;
      if (top && left) {
        target.className = targetType + ' boom';
        removeTargetToHit(target);
        setBoomSound();
        return true;
      }
    }
  }
  return false;
}

function createNewTarget() {
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    createEnemy();
  } else {
    createAsteroid();
  }
}

function checkIfCoordinatesIntersect(playerCoords, targetCoords) {
  const playerRight = playerCoords.x + playerCoords.width;
  const playerBottom = playerCoords.y + playerCoords.height;
  const targetRight = targetCoords.x + targetCoords.width;
  const targetBottom = targetCoords.y + targetCoords.height;

  return (
    playerCoords.x < targetRight &&
    playerRight > targetCoords.x &&
    playerCoords.y < targetBottom &&
    playerBottom > targetCoords.y
  );
}

function getCoordinatesAndDimensions(element) {
  const {
    offsetLeft: x,
    offsetTop: y,
    offsetWidth: width,
    offsetHeight: height,
  } = element;

  return { x, y, width, height };
}

function endGame() {
  isGameOver = true;
  endGameBlock.classList.remove('hidden');
  gameElementsBlock.innerHTML = '';
}
