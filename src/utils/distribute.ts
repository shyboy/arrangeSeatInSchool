import type { Cell } from "@antv/x6";

// todo 分布元素

// 垂直分布
export const verticalDistribute = (cells: Array<Cell>) => {
    const lenOfNodes = cells.length
    if(lenOfNodes <= 2)return

    const bottomNode = findBottom(cells)
    const topNode = findTop(cells)

    let {y:bottomY} = bottomNode.getProp<{ x: number; y: number }>("position");
    let {y:topY} = topNode.getProp<{ x: number; y: number }>("position");
    let allY = generateUniformNumbers(topY, bottomY, lenOfNodes-2)
    console.log(cells);
    console.log("top",topNode,"  bottom",bottomNode);
    
    
    const arrangedNodes = [bottomNode.id,topNode.id]
    console.log(arrangedNodes, allY);
    
    cells.forEach((node)=>{
        if (arrangedNodes.includes(node.id)) {
            return
        }
        const {x,y} = node.getProp<{ x: number; y: number }>("position")
        let newY=y;
        let yDistance=Infinity;
        allY.forEach((fixY)=>{
            // if(fixY === allY[-1] || fixY === allY[0])return
            if (Math.abs(y-fixY)<yDistance) {
                yDistance = Math.abs(y-fixY)
                newY = fixY
            }
        })
        node.setProp("position",{x:x,y:newY})
        arrangedNodes.push(node.id)
        allY = allY.filter(function(item) {
            return item !== newY
        });
        console.log(newY,allY);
        
    })
}

// 水平分布
export const horizontalDistribute= (cells: Array<Cell>) => {
    const lenOfNodes = cells.length
    if(lenOfNodes <= 2)return

    const bottomNode = findLeft(cells)
    const topNode = findRight(cells)

    let {x:bottomX} = bottomNode.getProp<{ x: number; y: number }>("position");
    let {x:topX} = topNode.getProp<{ x: number; y: number }>("position");
    let allX = generateUniformNumbers(bottomX, topX, lenOfNodes-2)
    console.log(cells);
    console.log("top",topNode,"  bottom",bottomNode);
    
    
    const arrangedNodes = [bottomNode.id,topNode.id]
    console.log(arrangedNodes, allX);
    
    cells.forEach((node)=>{
        if (arrangedNodes.includes(node.id)) {
            return
        }
        const {x,y} = node.getProp<{ x: number; y: number }>("position")
        let newX = x;
        let xDistance=Infinity;
        allX.forEach((fixX)=>{
            // if(fixY === allY[-1] || fixY === allY[0])return
            if (Math.abs(x-fixX)<xDistance) {
                xDistance = Math.abs(x-fixX)
                newX = fixX
            }
        })
        node.setProp("position",{x:newX,y})
        arrangedNodes.push(node.id)
        allX = allX.filter(function(item) {
            return item !== newX
        });
    })
}

function findBottom(cells: Array<Cell>): Cell{
    let res=cells[0];
    let {y:lastY} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        const {y} = node.getProp<{ x: number; y: number }>("position")
        if(lastY<y){
            res = node
            lastY = y
        }
    })
    return res
}

function findTop(cells: Array<Cell>): Cell{
    let res=cells[0];
    let {y:lastY} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        const {y} = node.getProp<{ x: number; y: number }>("position")
        if(lastY>y){
            res = node
            lastY = y
        }
    })
    return res
}

function findRight(cells: Array<Cell>): Cell{
    let res=cells[0];
    let {x:lastX} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        const {x} = node.getProp<{ x: number; y: number }>("position")
        if(lastX<x){
            res = node
            lastX = x
        }
    })
    return res
}

function findLeft(cells: Array<Cell>): Cell{
    let res=cells[0];
    let {x:lastX} = cells[0].getProp<{ x: number; y: number }>("position");
    cells.forEach((node)=>{
        const {x} = node.getProp<{ x: number; y: number }>("position")
        if(lastX>x){
            res = node
            lastX = x
        }
    })
    return res
}

function generateUniformNumbers(start:number, end:number, count:number) {
    if (count <= 0) {
      throw new Error('Count must be greater than 0');
    }
  
    if (end < start) {
      throw new Error('End must be greater than start');
    }
    
    const step = (end - start) / (count + 1);
    const result = [];
    // result.push(start)
    for (let i = 1; i <= count; i++) {
      let number = start + step * i;
      // 判断是否为小数
      if (number % 1 !== 0) {
        number = parseInt(number.toString());
        // number = parseFloat(number.toFixed(2));
      }
      result.push(number);
    }
    // result.push(end)
    return result;
  }