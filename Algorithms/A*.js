export function aStar(plane) {
    if(plane.start == null || plane.target == null) return
    plane.start.sCost = 0
    plane.start.fCost = calcF(plane.start, plane.target)

    let openList = [plane.start]
    let closedList = []
    let checkedGrids = []

    while(true){
        if(openList.length == 0){
            console.log("There is no solution. Please reselect start and target points")
            return [checkedGrids,[]]
        }
        const [current,index] = minCost(openList)
        openList.splice(index,1)
        closedList.push(current)
        if(current == plane.target) break
        const neighbours = selectNeighbours(current, plane)
        for (var i in neighbours){
            if (neighbours[i].isWall) continue
            if (closedList.find(a =>{return a == neighbours[i]})==undefined){
                if (
                    (current.sCost+10<neighbours[i].sCost) ||
                    (openList.find(a =>{return a == neighbours[i]})==undefined))
                    {
                    neighbours[i].sCost = current.sCost+10
                    neighbours[i].fCost = calcF(neighbours[i],plane.target)
                    neighbours[i].parent = current
                    if(openList.find(a =>{return a == neighbours[i]})==undefined)
                        openList.push(neighbours[i])
                        checkedGrids.push(neighbours[i])
                    }
            }
        }
    }
    let current = plane.target.parent
    let path = []
    while(current != plane.start){
        path.push(current)
        current = current.parent
    }
    path.reverse()
    return [checkedGrids,path]
}
function calcF(current, target){
    return (Math.abs(target.x-current.x)+Math.abs(target.y-current.y))*10
}
function minCost(l){
    let min = l[0]
    let k = 0
    for(var i = 1; i<l.length;i++){
        if (min.fCost + min.sCost > l[i].fCost + l[i].sCost) {
            min = l[i]
            k=i
        }
    }
    return [min,k]
}
function selectNeighbours(current,plane){
    let neighbours = []
    if (current.x+1<plane.width) neighbours.push(plane.matrix[current.y][current.x+1])
    if (current.x-1>=0) neighbours.push(plane.matrix[current.y][current.x-1])
    if (current.y+1<plane.height) neighbours.push(plane.matrix[current.y+1][current.x])
    if (current.y-1>=0) neighbours.push(plane.matrix[current.y-1][current.x])
    return neighbours
}
