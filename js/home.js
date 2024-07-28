const lenis = new Lenis();

const titles = ["00_INTR0", "01_AB0UT", "02_A$TR0_$H0WCASE", "03_ASTR0"];

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let animatedScroll = 0;
lenis.on("scroll", (e) => {
  let progress =
    e.animatedScroll / (document.body.clientHeight - window.innerHeight);
  let height = progress * window.innerHeight;
  let idx = Math.round(e.animatedScroll / window.innerHeight);

  document
    .getElementById("progress")
    .setAttribute("style", `height: ${height}px;`);
  document.getElementById("progress-label").innerHTML = titles[idx];

  animatedScroll = e.animatedScroll;
});

function raf(time) {
  lenis.raf(time);

  gsap.to(".showcase-m42", {
    x: -(mouseX / window.innerHeight) * 42 + 21 - 128,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 128 -
      (mouseY / window.innerHeight) * 42 +
      168,
  });

  gsap.to(".showcase-moon", {
    x: -(mouseX / window.innerHeight) * 128 + 64 + 300,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 128 -
      (mouseY / window.innerHeight) * 128 -
      80,
  });

  gsap.to(".showcase-saturn", {
    x: -(mouseX / window.innerHeight) * 80 + 40 + 200,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 80 -
      (mouseY / window.innerHeight) * 128 +
      256,
  });

  gsap.to(".showcase-m57", {
    x: -(mouseX / window.innerHeight) * 64 + 32 - 256,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 64 -
      (mouseY / window.innerHeight) * 64 -
      200,
  });

  gsap.to(".showcase-jupiter", {
    x: -(mouseX / window.innerHeight) * 50 + 25 - 320,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 50 -
      (mouseY / window.innerHeight) * 50 +
      42,
  });

  gsap.to(".showcase-m13", {
    x: -(mouseX / window.innerHeight) * 42 + 21 - 384,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 42 -
      (mouseY / window.innerHeight) * 42 +
      256,
  });

  gsap.to(".showcase-milkyway", {
    x: -(mouseX / window.innerHeight) * 42 + 21 + 550,
    y:
      ((animatedScroll - window.innerHeight * 2) / window.innerHeight) * 52 -
      (mouseY / window.innerHeight) * 42 +
      234,
  });

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
