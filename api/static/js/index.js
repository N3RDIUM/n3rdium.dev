const lenis = new Lenis()

const panels = document.querySelectorAll('.panel')
const variants = ['blue', 'green', 'purple', 'starfield']
panels.forEach((panel) => {
    const id = panel.id
    const name = id.replace('panel', '')
    const index = parseInt(name)
    if (index % 2 == 0) {
        let _string = variants[Math.floor(Math.random() * variants.length)].toString()
        let _num = 1
        if (_string == "purple") {
            _num = Math.floor(Math.random() * 7) + 1
        } else {
            _num = Math.floor(Math.random() * 8) + 1
        }
        let bgname = 'background-' + _string + '-' + _num.toString()
        panel.classList.add(bgname)
    }
})

lenis.on('scroll', (e) => {
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)