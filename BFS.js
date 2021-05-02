export function BFS(plane){
    let activeGrids = []
    let checkedGrids = [plane.start]
    let currentGrid = plane.start
    let path = []
    while (true){
        const neighbours = selectNeighbours(currentGrid, plane)
        for (var i in neighbours){
            if (!neighbours[i].isWall){
                if (checkedGrids.find(a => {return a == neighbours[i]}) == undefined){
                    if (activeGrids.find(a => {return a == neighbours[i]}) == undefined){
                        neighbours[i].parent = currentGrid
                        activeGrids.push(neighbours[i])
                    }
                }
            }
        }
        if (currentGrid == plane.target) break
        currentGrid = activeGrids[0]
        checkedGrids.push(currentGrid)
        activeGrids.splice(0,1)
    }
    let current = plane.target.parent
    while (current != plane.start){
        path.push(current)
        current = current.parent
    }
    checkedGrids.splice(0,1)
    path.reverse()
    return [checkedGrids, path]
}
function selectNeighbours(current,plane){
    let neighbours = []
    if (current.x+1<plane.width) neighbours.push(plane.matrix[current.y][current.x+1])
    if (current.x-1>=0) neighbours.push(plane.matrix[current.y][current.x-1])
    if (current.y+1<plane.height) neighbours.push(plane.matrix[current.y+1][current.x])
    if (current.y-1>=0) neighbours.push(plane.matrix[current.y-1][current.x])
    return neighbours
}