/* Cursor.js */
let current = {x: 0, y: 0};
let previous = {x: 0, y: 0};
let actual = {x: 0, y: 0};
let ease = 0.16;
document.addEventListener('mousemove', function(e) {
    actual.x = e.clientX;
    actual.y = e.clientY;
})
let frame = 0
function animate() {
    let temp_x = current.x;
    let temp_y = current.y;
    current.x += (actual.x - current.x) * ease;
    current.y += (actual.y - current.y) * ease;
    let rotationZ = (current.y - previous.y) * (current.y - previous.y) / 20;
    let rotationY = (current.x - previous.x) * (current.x - previous.x) / 20;
    document.querySelector('.cursor').style.transform = `translate3d(${current.x-20.5}px, ${current.y-20.5+window.scrollY}px, 0) rotateX(${rotationZ}deg) rotateY(${rotationY}deg)`;
    frame += 1
    previous.x = temp_x;
    previous.y = temp_y;
    requestAnimationFrame(animate);
}
animate();