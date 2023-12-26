const hideDelay = 750
let moviePlayer
let videoStream

let mouseInside = false
let timer

const observer = new MutationObserver((_records, obs) => {
  if (moviePlayer == null) {
    moviePlayer = document.querySelector('#movie_player');
  }
  if (videoStream == null) {
    videoStream = document.querySelector('.video-stream');
  }

  if (moviePlayer != null && videoStream != null) {
    obs.disconnect(); // Stop observing after the player is found
    onMoviePlayerLoaded();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});

function onMoviePlayerLoaded() {
  moviePlayer.addEventListener("mouseover", onMouseOver)
  moviePlayer.addEventListener("mouseout", onMouseOut)

  videoStream.addEventListener('play', () => {
    showControls()
    if (!mouseInside) {
      hideControls()
    }
  })

  videoStream.addEventListener('pause', () => {
    showControls()
    if (!mouseInside) {
      hideControls()
    }
  })

  videoStream.focus()
  const playButton = document.querySelector('button.ytp-play-button')
  if (playButton != null) {
    // In my browser, the play button doesn't work when pressing the space bar
    // if the play button has focus. Not sure if it's an extension causing the
    // issue or something else.
    playButton.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.keyCode === 32) {
        if (!videoStream.ended) {
          e.preventDefault()
          if (videoStream.paused) {
            videoStream.play()
          } else {
            videoStream.pause()
          }
        }
      }
    });
  }
}

function onMouseOver() {
  mouseInside = true
  showControls()
}

function onMouseOut() {
  mouseInside = false
  hideControls()
}

function showControls() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  moviePlayer.classList.remove('ytp-autohide');
}

function hideControls() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  timer = setTimeout(() => {
    moviePlayer.classList.add('ytp-autohide')
    timer = null
  }, hideDelay)
}
