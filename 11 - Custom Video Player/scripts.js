const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const sliders = document.querySelectorAll('.player__slider')
const buttons = document.querySelectorAll('.player__button')
const fullscreen = document.querySelector('.fullscreen')


function togglePlay () {
  const action = video.paused ? 'play' : 'pause'
  video[action]()
}

function toggleBtn () {
  const action = this.paused ? 'play_arrow' : 'stop'
  toggle.textContent = action
}
function updateRange () {
  video[this.name] = this.value
}

function skipVideo () {
  video.currentTime += parseInt(this.dataset.skip)
}
function updateProgressBar () {
  progressBar.style.flexBasis = ( this.currentTime / this.duration ) * 100 + '%'
}

function changeVideo (e) {
  video.currentTime = ( e.offsetX / progress.offsetWidth ) * video.duration
}
function fullscreenHandler () {
  video.requestFullscreen()
}

video.addEventListener('click', togglePlay)
document.addEventListener('keyup', (e) => e.code === 'Space' && togglePlay())
video.addEventListener('play', toggleBtn)
video.addEventListener('pause', toggleBtn)
video.addEventListener('timeupdate', updateProgressBar)

toggle.addEventListener('click', togglePlay)

sliders.forEach(slider => slider.addEventListener('change', updateRange))
sliders.forEach(slider => slider.addEventListener('mousemove', updateRange))

buttons.forEach(button => button.addEventListener('click', skipVideo))

progress.addEventListener('click', changeVideo)

let mouseDown = false
progress.addEventListener('mousemove', e => mouseDown && changeVideo(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

fullscreen.addEventListener('click', fullscreenHandler)
