import {Plane} from "./Plane.js"
import {aStar} from "./Algorithms/A*.js"
import {BFS} from "./Algorithms/BFS.js"
import {generateMaze} from "./MazeGenerator.js"

////////// include functions such as createWall into plane class
// make the same with grid if possible

const plane = new Plane(document.body,20,20)
const switchButton = document.getElementById('switch-button')
const restartButton = document.getElementById('restart-button')
const noPathText = document.getElementById('no-path-text')
const algorithmSelecter = document.getElementById('algorithm-selecter')
const mazeGeneratorButton = document.getElementById('maze-generator-button')

let pathFinder = aStar
let path = []
let checkedGrids = []

let startTurn = true
let dragged = false
let mode = 'walls'

export function update(){
    updateGirds()
} 

function changeAlgorithm(name){
    if (name == 'A*') pathFinder = aStar
    else if (name == 'BFS') pathFinder = BFS
}

function setUpMaze(){
    restart()
    plane.walls = generateMaze(plane)
    plane.walls.forEach(item =>{
        item.isWall = true
        item.element.classList = 'grid wall'
    })
}

let chGrIndex = 0
let pathIndex = 0
function updateGirds(){
    if(chGrIndex < checkedGrids.length){
        checkedGrids[chGrIndex].element.classList.add('current-grid')
        chGrIndex++
    } else if(pathIndex < path.length) {
        path[pathIndex].element.classList.add('path-grid')
        pathIndex++
    }
}

function restart(){
    stopChange()
    plane.target = null
    plane.start = null
    plane.walls = []
    plane.matrix.forEach(row =>{
        row.forEach(grid => {
            grid.isWall = false
            grid.element.classList = 'grid'
            grid.element.id = ''
            mode = 'walls'
        })
    })
}


function resetTarget(){
    stopChange()
    plane.target = null
    plane.start = null
    plane.matrix.forEach(row =>{
        row.forEach(grid => {
            if (!grid.isWall) grid.element.classList = 'grid'
            grid.element.id = ''
        })
    })
}

function stopChange(){
    checkedGrids = []
    path = []
    chGrIndex = 0
    pathIndex = 0
}
function resetGridsClasses(){
    plane.matrix.forEach(row =>{
        row.forEach(grid => {
            if (!grid.isWall)
                grid.element.classList = 'grid'
        })
    })
}
function updatePath(){
    noPathText.style.display = 'none'
    const o = pathFinder(plane)
    checkedGrids = o[0]
    path = o[1]
    if(o[1].length == 0) noPathText.style.display = 'inline'
}
function createWall(e){
    const selected = plane.matrix[e.target.style.gridRowStart-1][e.target.style.gridColumnStart-1]
    plane.walls.push(selected)
    selected.isWall = true
    selected.element.classList = 'grid wall'
    //if (checkedGrids.find(a =>{return a == selected})!=undefined) - delete the wall from checked grids to prevent animation
    if (path.find(a =>{return a == selected})!=undefined) {
        //if (pathIndex==0) - make instant path finding if path is already drawn
        stopChange()
        resetGridsClasses()
        updatePath()
    }
}

function setStartAndTarget(grid){
    if(mode != 'target') return
    const selected = plane.matrix[grid.style.gridRowStart-1][grid.style.gridColumnStart-1]
    if (selected.isWall) return
    if(plane.target != null) resetTarget()
    if (startTurn){
        selected.element.id = 'start-grid'
        plane.start = selected
    }   
    else {
        selected.element.id = 'target-grid'
        plane.target = selected
        updatePath()
    }
    startTurn = !startTurn
}

//////////// EVENT LISTENERS //////////////

algorithmSelecter.onchange = function(){changeAlgorithm(algorithmSelecter.value)}

mazeGeneratorButton.onclick = function(){setUpMaze()}

plane.element.addEventListener('mousedown', e=>{
    if(mode == 'walls'){
        createWall(e)
        dragged = true
    }
})

window.addEventListener('mouseup', e=>{
    if(mode == 'walls'){
        dragged = false
    }
})

plane.element.addEventListener('mouseover',e=>{
    if (!dragged) return
    createWall(e)
})

plane.element.addEventListener('mouseup', e => {
    setStartAndTarget(e.target)
})

switchButton.addEventListener('click', e=>{
    if (mode == 'walls') {
        mode = 'target'
        switchButton.innerHTML = 'TARGET'
    }
    else {
        mode ='walls'
        switchButton.innerHTML = 'WALLS'
    }
})

restartButton.addEventListener('click', e=>{
    restart()
})