import type { Cell } from "@antv/x6";

export const horizontalAlign = (cells: Array<Cell>, direction:string) => {

    if(cells.length === 1)return
    let {x:newX} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        let {x} = node.getProp<{ x: number; y: number }>("position")
        if(direction === "left"){
            newX = x < newX?x:newX
        }else if(direction === "right") {
            newX = x > newX?x:newX
        }
        
    })
    cells.forEach((node)=>{
        let {x, y} = node.getProp<{ x: number; y: number }>("position")
        if(direction === "left"){
            if(x>newX){
                node.setProp("position",{x:newX,y:y})
            }
        }else if(direction === "right") {
            if(x<newX){
                node.setProp("position",{x:newX,y:y})
            }
        }
    })
}

export const verticalAlign = (cells: Array<Cell>, direction:string) => {
    if(cells.length === 1)return
    let {y:newY} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        let {y} = node.getProp<{ x: number; y: number }>("position")
        if(direction === "top"){
            newY = y < newY?y:newY
        }else if(direction === "bottom") {
            newY = y > newY?y:newY
        }
        
    })
    cells.forEach((node)=>{
        let {x, y} = node.getProp<{ x: number; y: number }>("position")
        console.log(`(${x},${y})`);
        
        if(direction === "top"){
            if(y>newY){
                node.setProp("position",{x:x,y:newY})
            }
        }else if(direction === "bottom") {
            if(y<newY){
                node.setProp("position",{x:x,y:newY})
            }
        }
    })
}