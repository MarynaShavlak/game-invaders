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
const winGameBlock = document.querySelector('.win-game');
const firstSkin = document.querySelector('.skin1');
const secondSkin = document.querySelector('.skin2');
const thirdSkin = document.querySelector('.skin3');
const gameFieldWidth = document.querySelector('body').offsetWidth;
const gameFieldHeight = document.querySelector('body').offsetHeight;

let deathEnemiesQuantity = 0;
let goal = 150;
let enemySpeed = 10;

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
    target.style.top = target.offsetTop + enemySpeed + 'px';
    const isTargetOutField = target.offsetTop > gameFieldHeight;

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
      let isHit = isBulletHitTarget(bulletEl, target);
      if (isHit) {
        handleTargetHit(target, targetType);
        return true;
      }
    }
  }
  return false;
}

function isBulletHitTarget(bulletEl, target) {
  let top =
    bulletEl.offsetTop > target.offsetTop &&
    bulletEl.offsetTop < target.offsetTop + target.offsetHeight;
  let left =
    bulletEl.offsetLeft > target.offsetLeft &&
    bulletEl.offsetLeft < target.offsetLeft + target.offsetWidth;
  return top && left;
}
function handleTargetHit(target, targetType) {
  target.className = targetType + ' boom';
  removeTargetToHit(target);
  setBoomSound();
  updatePlayerResultsAndEnemySpeed();
  if (deathEnemiesQuantity === goal) {
    winGame();
  }
}
function createNewTarget() {
  const randomNumber = Math.random();
  const createEntity = randomNumber < 0.5 ? createEnemy : createAsteroid;
  if (randomNumber > 0.8) {
    createEntity();
    createEntity();
  } else {
    createEntity();
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

function winGame() {
  isGameOver = true;
  winGameBlock.classList.remove('hidden');
  gameElementsBlock.innerHTML = '';
}

function getRandomTimeout() {
  const min = 100;
  const max = 10000;
  return randomCoordinate(min, max);
}

function randomCoordinate(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
