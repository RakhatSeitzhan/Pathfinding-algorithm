export class Grid{
    constructor(parent, x ,y){
        this.x = x
        this.y = y
        this.sCost
        this.fCost
        this.parent
        this.isWall = false
        this.element = document.createElement("div")
        this.element.classList.add('grid')
        this.element.style.gridColumnStart = x+1
        this.element.style.gridRowStart = y+1
        parent.appendChild(this.element)
    }
}