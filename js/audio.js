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

function setBlasterSound() {
  const blasterSound = new Audio('sound/shot.mp3');
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
