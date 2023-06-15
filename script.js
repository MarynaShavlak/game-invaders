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

const appEl = document.querySelector('#app');
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
  const gameFieldWidth = document.querySelector('body').offsetWidth;
  const left = randomCoordinate(150, gameFieldWidth - 150);
  const targetToHitEl = document.createElement('div');
  targetToHitEl.className = className;
  targetToHitEl.style.left = left + 'px';
  appEl.appendChild(targetToHitEl);
  return targetToHitEl;
}

function moveTargetToHit(target) {
  let timerID = setInterval(() => {
    target.style.top = target.offsetTop + 30 + 'px';
    const isTargetOutField =
      target.offsetTop > document.querySelector('body').offsetHeight;

    if (isTargetOutField) {
      target.remove();
      createNewTarget();
      decreaseLifesQauntity();
      clearInterval(timerID);
    }
  }, 1);
  setInterval(() => {
    let targetCoords = getCoordinatesAndDimensions(target);
    let playerCoords = getCoordinatesAndDimensions(playerEl);
    let playerX = playerCoords.x;
    let playerY = playerCoords.y;
    let playerWidth = playerCoords.width;
    let playerHeight = playerCoords.height;
    let targetX = targetCoords.x;
    let targetY = targetCoords.y;
    let targetWidth = targetCoords.width;
    let targetHeight = targetCoords.height;
    var isIntersecting = doCoordinatesIntersect(
      playerX,
      playerY,
      playerWidth,
      playerHeight,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
    );
    console.log('Are the coordinates intersecting?', isIntersecting);
  }, 1000);
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

function doCoordinatesIntersect(
  playerX,
  playerY,
  playerWidth,
  playerHeight,
  enemyX,
  enemyY,
  enemyWidth,
  enemyHeight,
) {
  let playerRight = playerX + playerWidth;
  let playerBottom = playerY + playerHeight;
  let enemyRight = enemyX + enemyWidth;
  let enemyBottom = enemyY + enemyHeight;

  if (
    playerX < enemyRight &&
    playerRight > enemyX &&
    playerY < enemyBottom &&
    playerBottom > enemyY
  ) {
    return true;
  }

  return false;
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
