// 要素の取得
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 関数
const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

const updateButton = e => toggle.textContent = e.target.paused ? '再生' : '停止';

const skip = e => video.currentTime += parseFloat(e.target.dataset.skip);

const handleRangeUpdate = e => video[e.target.name] = e.target.value;

const handleProgress = () => {
  const present = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${present}%`;
}

const scrub = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;

}

// イベント
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);