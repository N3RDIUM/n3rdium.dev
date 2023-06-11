// If the browser is chrome
if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
    console.log("Browser does not support gradient.")
    let el = document.getElementById("username")
    el.classList.add("uname-chrome")
    el.classList.remove("uname")
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;
const qs = ".uname"
try{
  document.querySelector(qs).onmouseover = event => {  
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return event.target.dataset.value[index];
            }
          
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("");
        
        if(iteration >= event.target.dataset.value.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
  }
} catch (e) {console.log(e)}