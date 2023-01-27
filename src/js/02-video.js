import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const key = 'videoplayer-current-time';
const keyValue = localStorage.getItem(key);
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const playTime = throttle(element => {
  localStorage.setItem(key, element.seconds);
}, 1000);

if (keyValue) {
  player.setCurrentTime(keyValue);
}
player.on('timeupdate', playTime);
