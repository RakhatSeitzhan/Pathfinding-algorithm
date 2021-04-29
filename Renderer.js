import {update} from "./Main.js"

let lastRenderTime = 0 
let frameRate = 30
function render(currentTime){
    window.requestAnimationFrame(render)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / frameRate) return
    lastRenderTime = currentTime
    update()
}

window.requestAnimationFrame(render)