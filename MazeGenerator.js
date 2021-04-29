export function generateMaze(plane){
    let currentGrid = plane.matrix[getRandomInt(plane.width)][getRandomInt(plane.height)]
    let checkedGrids = []
    let activeGrids = [currentGrid]
    let walls = []
    while (activeGrids.length != 0){
        let neighbours = selectNeighbours(currentGrid, plane)
        neighbours = neighbours.sort(() => Math.random() - 0.5)
        let toAdd = true
        for (var i in neighbours){
            if (checkedGrids.find(a => {return a == neighbours[i]}) == undefined){
                if (activeGrids.find(a => {return a == neighbours[i]}) == undefined){
                    neighbours[i].parent = currentGrid
                    activeGrids.push(neighbours[i])
                    if (walls.find(a => {return a == neighbours[i]}) == undefined) toAdd = false
                }
            }
        }
        if (toAdd) walls.push(currentGrid)
        currentGrid = activeGrids[activeGrids.length-1]
        checkedGrids.push(currentGrid)
        activeGrids.splice(activeGrids.length-1,1)
    }
    return walls
}
function selectNeighbours(current,plane){
    let neighbours = []
    if (current.x+1<plane.width) neighbours.push(plane.matrix[current.y][current.x+1])
    if (current.x-1>=0) neighbours.push(plane.matrix[current.y][current.x-1])
    if (current.y+1<plane.height) neighbours.push(plane.matrix[current.y+1][current.x])
    if (current.y-1>=0) neighbours.push(plane.matrix[current.y-1][current.x])
    return neighbours
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }