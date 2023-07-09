const HideDelay = 1000
const MoviePlayer = document.getElementById('movie_player')

let MouseInside = false
let Timer

document.querySelector('video.video-stream')
  .addEventListener('pause', () => {
    showControls()
    if (!MouseInside) {
      hideControls()
    }
  })

MoviePlayer.addEventListener("mouseover", onMouseOver)
MoviePlayer.addEventListener("mouseout", onMouseOut)

function onMouseOver() {
  MouseInside = true
  showControls()
}

function onMouseOut() {
  MouseInside = false
  hideControls()
}

function showControls() {
  if (Timer) {
    clearTimeout(Timer)
    Timer = null
  }

  document.getElementById('movie_player')
    .classList.remove('ytp-autohide');
}

function hideControls() {
  if (Timer) {
    clearTimeout(Timer)
    Timer = null
  }

  Timer = setTimeout(() => {
    document.getElementById('movie_player')
      .classList.add('ytp-autohide')
    Timer = null
  }, HideDelay)
}
