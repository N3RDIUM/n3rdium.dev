var nav = false;

function enter() {
    anime({
        targets: '#hamburger-line1',
        opacity: 1,
        rotate: -45,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
    anime({
        targets: '#hamburger-line2',
        opacity: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
    anime({
        targets: '#hamburger-line3',
        opacity: 1,
        rotate: 45,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
}
function leave() {
    anime({
        targets: '#hamburger-line1',
        opacity: 1,
        rotate: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
    anime({
        targets: '#hamburger-line2',
        opacity: 1,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
    anime({
        targets: '#hamburger-line3',
        opacity: 1,
        rotate: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
    })
}