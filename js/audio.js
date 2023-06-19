const audioPlayer = document.querySelector('#audio');
const soundBtnMenu = document.querySelector('.sounds');
const soundOnBtn = document.querySelector('.soundOn');
const soundOffBtn = document.querySelector('.soundOff');
let muted = false;
soundBtnMenu.onclick = toggleMuted;

function setSoundProperties(sound, volume) {
  sound.volume = volume;
  sound.muted = muted;
  sound.play();
}

function setBlasterSound(bulletType) {
  let blasterSound;
  switch (bulletType) {
    case 'bullet-1':
      blasterSound = new Audio('sound/shot.mp3');
      break;
    case 'bullet-2':
      blasterSound = new Audio('sound/shot-2.mp3');
      break;
    case 'bullet-3':
      blasterSound = new Audio('sound/shot-3.mp3');
      break;
    default:
      blasterSound = new Audio('sound/shot-1.mp3');
      break;
  }

  setSoundProperties(blasterSound, 0.1);
}

function setBackgroundSound() {
  setSoundProperties(audioPlayer, 0.1);
}

function setBoomSound() {
  const boomSound = new Audio('sound/boom.mp3');
  setSoundProperties(boomSound, 0.4);
}

function toggleMuted() {
  muted = !muted;
  soundOnBtn.classList.toggle('hidden');
  soundOffBtn.classList.toggle('hidden');
  audioPlayer.muted = muted;
}
