import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.setCurrentTime(getSavedTime()).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;

    default:
      break;
  }
});

function onTimeUpdate(time) {
  const playedTime = time.seconds;
  localStorage.setItem(CURRENT_TIME, playedTime);
}

function getSavedTime() {
  return Number(localStorage.getItem(CURRENT_TIME));
}
