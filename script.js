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
const player = document.querySelector('#player');

document.onclick = function () {
  moveLeft();
};
document.onkeydown = function (e) {
  switch (e.code) {
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'Space':
      makeShot();
      break;
  }
};

function moveLeft() {
  if (player.offsetLeft - 30 >= 100) {
    player.style.left = player.offsetLeft - 30 + 'px';
  }
}
function moveRight() {
  const gameFieldWidth = document.querySelector('body').offsetWidth;

  if (player.offsetLeft + player.offsetWidth + 30 <= gameFieldWidth - 100) {
    player.style.left = player.offsetLeft + 30 + 'px';
  }
}
function makeShot() {
  let bulletEl = document.createElement('div');
  bulletEl.classList.add('bullet');
  bulletEl.style.top = player.offsetTop + 'px';
  bulletEl.style.left = player.offsetLeft + player.offsetWidth / 2 + 'px';
  appEl.appendChild(bulletEl);
  let timerID = setInterval(() => {
    const isEnemyKilled = isHit(bulletEl);
    const isBulletOutField = bulletEl.offsetTop < 0;
    if (isEnemyKilled || isBulletOutField) {
      bulletEl.remove();
      clearInterval(timerID);
    }
    bulletEl.style.top = bulletEl.offsetTop - 10 + 'px';
  }, 100);
}

function isHit(bulletEl) {
  const enemiesList = document.querySelectorAll('.enemy');
  for (let i = 0; i < enemiesList.length; i++) {
    let enemy = enemiesList[i];
    let isEnemyExist = enemy && !enemy.classList.contains('boom');
    if (isEnemyExist) {
      let top =
        bulletEl.offsetTop > enemy.offsetTop &&
        bulletEl.offsetTop < enemy.offsetTop + enemy.offsetHeight;
      let left =
        bulletEl.offsetLeft > enemy.offsetLeft &&
        bulletEl.offsetLeft < enemy.offsetLeft + enemy.offsetWidth;
      if (top && left) {
        enemy.className = 'enemy boom';
        // removeEnemy(enemy);
        removeTargetToHit(enemy);

        return true;
      }
    }
  }
  return false;
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
    target.style.top = target.offsetTop + 4 + 'px';
    const isTargetOutField =
      target.offsetTop > document.querySelector('body').offsetHeight;
    if (isTargetOutField) {
      target.remove();
      clearInterval(timerID);
    }
  }, 1);
}

function removeTargetToHit(target) {
  setTimeout(() => {
    target.remove();
  }, 800);
}
