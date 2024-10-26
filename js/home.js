const lenis = new Lenis();

// D O M
// const letters = [
//   document.getElementById("username-n"),
//   document.getElementById("username-3"),
//   document.getElementById("username-r"),
//   document.getElementById("username-d"),
//   document.getElementById("username-i"),
//   document.getElementById("username-u"),
//   document.getElementById("username-m"),
// ];

// S C R O L L
var scroll = null;
lenis.on("scroll", (e) => {
  scroll = e;
});

function raf(time) {
  lenis.raf(time);

  // C O N S T A N T S
  let LETTER_SPACING = window.innerWidth / 7;

  // V A R I A B L E S
  let animatedScroll = scroll != null ? scroll.animatedScroll : 0;

  ////////////////////////////////////////////////////////////////
  // U S E R N A M E /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  gsap.to(".username", {
    scale: (animatedScroll / window.innerHeight + 1) ** 3,
  });

  gsap.to(".letter-n", {
    scale: (animatedScroll / window.innerHeight + 1) ** 3,
    margin: (animatedScroll / window.innerHeight) * 512,
  });
  gsap.to(".letter-3", {
    scale: (animatedScroll / window.innerHeight + 1) ** 2,
    margin: (animatedScroll / window.innerHeight) * 256,
  });
  gsap.to(".letter-r", {
    scale: animatedScroll / window.innerHeight + 1,
    margin: (animatedScroll / window.innerHeight) * 128,
  });

  gsap.to(".letter-i", {
    scale: animatedScroll / window.innerHeight + 1,
    margin: (animatedScroll / window.innerHeight) * 128,
  });
  gsap.to(".letter-u", {
    scale: (animatedScroll / window.innerHeight + 1) ** 2,
    margin: (animatedScroll / window.innerHeight) * 256,
  });
  gsap.to(".letter-m", {
    scale: (animatedScroll / window.innerHeight + 1) ** 3,
    margin: (animatedScroll / window.innerHeight) * 512,
  });

  requestAnimationFrame(raf);
}

document.addEventListener("DOMContentLoaded", (event) => {
  requestAnimationFrame(raf);
});
