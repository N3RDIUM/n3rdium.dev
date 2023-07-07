/* Cursor.js */
let current = {x: 0, y: 0};
let previous = {x: 0, y: 0};
let actual = {x: 0, y: 0};
let ease = 0.16;
let actualDeltaScroll = 0;
let deltaScroll = 0;
document.addEventListener('mousemove', function(e) {
    actual.x = e.clientX;
    actual.y = e.clientY;
})
onwheel = function(e) {
    actualDeltaScroll = e.wheelDeltaY / 2.4;
}

const spacebgs = document.getElementsByClassName("space")
for (let i = 0; i < spacebgs.length; i++) {
  let space = spacebgs[i]
  space.addEventListener("mouseenter", function() {
    document.querySelector('.cursor').classList.add("cursor-spacewin")
    document.querySelector('.cursor').classList.remove("cursor-normal")
  })
  space.addEventListener("mouseleave", function() {
    document.querySelector('.cursor').classList.add("cursor-normal")
    document.querySelector('.cursor').classList.remove("cursor-spacewin")
  })
}

const Btns = document.getElementsByClassName("normal-button")
for (let i = 0; i < Btns.length; i++) {
    let spacebgBtn = Btns[i]
    spacebgBtn.addEventListener("mouseenter", function() {
        document.querySelector('.cursor').classList.add("cursor-btn")
        document.querySelector('.cursor').classList.remove("cursor-normal")
        let crosshair = document.createElement("div")
        crosshair.classList.add("cursor-crosshair-black")
        document.querySelector('.cursor').appendChild(crosshair)
        console.log(crosshair)
    })
    spacebgBtn.addEventListener("mouseleave", function() {
        document.querySelector('.cursor').classList.add("cursor-normal")
        document.querySelector('.cursor').classList.remove("cursor-btn")
        document.querySelector('.cursor-crosshair-black').remove()
    })
}

const spacebgBtns = document.getElementsByClassName("spacebg-button")
for (let i = 0; i < spacebgBtns.length; i++) {
    let spacebgBtn = spacebgBtns[i]
    spacebgBtn.addEventListener("mouseenter", function() {
        document.querySelector('.cursor').classList.add("cursor-space2btn")
        document.querySelector('.cursor').classList.remove("cursor-spacewin")
        let crosshair = document.createElement("div")
        crosshair.classList.add("cursor-crosshair")
        document.querySelector('.cursor').appendChild(crosshair)
        console.log(crosshair)
    })
    spacebgBtn.addEventListener("mouseleave", function() {
        document.querySelector('.cursor').classList.add("cursor-spacewin")
        document.querySelector('.cursor').classList.remove("cursor-space2btn")
        document.querySelector('.cursor-crosshair').remove()
    })
}

let frame = 0;
function animate() {
    let temp_x = current.x;
    let temp_y = current.y;
    current.x += (actual.x - current.x) * ease;
    current.y += (actual.y - current.y) * ease;
    deltaScroll += (actualDeltaScroll - deltaScroll) * ease;
    actualDeltaScroll *= 0.9;
    let rotationY = (current.x - previous.x);
    let rotationZ = (current.y - previous.y) + deltaScroll;
    document.querySelector('.cursor').style.transform = `translate3d(${current.x-20}px, ${current.y-20}px, 0) rotateX(${rotationZ}deg) rotateY(${rotationY}deg)`;
    frame += 1
    previous.x = temp_x;
    previous.y = temp_y;
    requestAnimationFrame(animate);
}
animate();