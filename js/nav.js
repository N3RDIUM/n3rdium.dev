let nav = false
let barVisible = true
let barMoved = false

lenis.on('scroll', (e) => {
  if (e.velocity != 0) {
    if (e.velocity > 0) {
      if (barVisible) {
        barVisible = false
        barMoved = false
      }
    } else {
      if (!barVisible) {
        barVisible = true
        barMoved = false
      }
    }
  }

  if (!barVisible) {
    if (!barMoved) {
      anime({
        targets: '#header',
        top: -64,
        duration: 800,
        easing: 'easeInOutExpo'
      })
      barMoved = true
    }
  } else {
    if (!barMoved) {
      anime({
        targets: '#header',
        top: 0,
        duration: 400,
        easing: 'easeInOutExpo'
      })
      barMoved = true
    }
  }
})

function hover () {
  if (!nav) {
    anime({
      targets: '#hamburger-line1',
      opacity: 1,
      rotate: -45,
      duration: 500,
      easing: 'easeInOutExpo'
    })
    anime({
      targets: '#hamburger-line2',
      opacity: 0,
      duration: 500,
      easing: 'easeInOutExpo'
    })
    anime({
      targets: '#hamburger-line3',
      opacity: 1,
      rotate: 45,
      duration: 500,
      easing: 'easeInOutExpo'
    })
  } else {
    anime({
      targets: '#hamburger-line1',
      opacity: 1,
      rotate: 45,
      duration: 500,
      easing: 'easeInOutExpo'
    })
    anime({
      targets: '#hamburger-line2',
      opacity: 0,
      duration: 500,
      easing: 'easeInOutExpo'
    })
    anime({
      targets: '#hamburger-line3',
      opacity: 1,
      rotate: -45,
      duration: 500,
      easing: 'easeInOutExpo'
    })
  }
}
function unhover () {
  anime({
    targets: '#hamburger-line1',
    opacity: 1,
    rotate: 0,
    duration: 500,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: '#hamburger-line2',
    opacity: 1,
    duration: 500,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: '#hamburger-line3',
    opacity: 1,
    rotate: 0,
    duration: 500,
    easing: 'easeInOutExpo'
  })
}
function toggleNav () {
  nav = !nav
  hover()

  if (nav) {
    anime({
      targets: '#navtray',
      right: 0,
      easing: 'easeInOutExpo',
      duration: 1000
    })
    anime({
      targets: '#content-cover',
      opacity: 1,
      easing: 'easeInOutExpo',
      duration: 1000
    })
  } else {
    anime({
      targets: '#navtray',
      right: -318,
      easing: 'easeInOutExpo',
      duration: 1000
    })
    anime({
      targets: '#content-cover',
      opacity: 0,
      easing: 'easeInOutExpo',
      duration: 1000
    })
  }
}

// If the browser supports avif
const avif = new Image()
avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
avif.onload = function () {
  document.getElementById('havatar').setAttribute('src', '../img/n3rdium.avif')
}
