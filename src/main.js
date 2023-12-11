const hideDelay = 750
let moviePlayer
let videoStream

let mouseInside = false
let timer

const observer = new MutationObserver((records, obs) => {
  for (const record of records) {
    for (const addedNode of record.addedNodes) {
      if (moviePlayer == null
        && addedNode.nodeType == Node.ELEMENT_NODE
        && addedNode.id === 'movie_player') {
        moviePlayer = addedNode
      }

      if (videoStream == null
        && addedNode.nodeType == Node.ELEMENT_NODE
        && addedNode.tagName.toLowerCase() === 'video'
        && addedNode.classList.contains('video-stream')) {
        videoStream = addedNode
      }
    }
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
  moviePlayer.focus()
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
