import { Grid } from "./Grid.js"
 
export class Plane{
    constructor(parent,w,h){
        this.width = w
        this.height = h
        this.matrix = []
        this.walls = []
        this.element = document.createElement('div')
        this.element.classList.add('plane')
        this.target = null
        this.start = null
        for(var y = 0; y<this.height;y++){
            let a = []
            for(var x = 0; x<this.width;x++){
                const g = new Grid(this.element,x,y)
                a.push(g)
            }
            this.matrix.push(a)
        }
        parent.appendChild(this.element)
    }
}
