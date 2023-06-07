// If the browser is chrome
if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
    console.log("Browser does not support gradient.")
    let el = document.getElementById("username")
    el.classList.add("uname-chrome")
    el.classList.remove("uname")
}

let _chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM"
let el = document.getElementsByClassName("uname-letter")
let progress = []
let toreach = []

function resetText(){
    for (let i = 0; i < el.length; i++) {
        progress.push(Math.abs(Math.floor(Math.random() * 16)))
        toreach.push(el[i].innerHTML)
        let interval = setInterval(async function() {
            if(_chars[progress[i]] == toreach[i]) clearInterval(interval)
            el[i].innerHTML = _chars[progress[i]]
            progress[i]++
            if(_chars[progress[i]] == undefined) {
                progress[i] = 0
            }
        }, 10)
    }
}

// When the document is loaded, we will start the animation
document.getElementById("username").addEventListener("click", resetText)
document.getElementById("username").addEventListener("mouseenter", function(){
    resetText()
})