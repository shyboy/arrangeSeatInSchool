import type { Cell, Graph } from "@antv/x6";

export const deleteNodes = (graph:Graph, cells: Array<Cell>) => {
    if (cells.length) {
    graph.removeCells(cells)
    }
}

export const copyNodes = (graph:Graph, cells:Array<Cell>) => {
    if(!cells.length)return
    graph.copy(cells)
}

export const pasteNodes = (graph:Graph) => {
    if (!graph.isClipboardEmpty()){
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
    }
}

// 获取最顶和最低的cell的zIndex
export const getZIndexRange = (cells: Array<Cell>) => {
    let topZIndex = -Infinity;
    let bottomZIndex = Infinity;
    cells.forEach(cell => {
        topZIndex = cell.zIndex as number > topZIndex ? cell.zIndex as number:topZIndex;
        bottomZIndex = cell.zIndex as number < bottomZIndex ? cell.zIndex as number:bottomZIndex;
    });
    return {topZIndex, bottomZIndex}
}

export const moveUpNodes = (cells: Array<Cell>) => {
    cells.forEach((cell) => {
        cell.setZIndex(cell.zIndex as number+1)
    })
}

export const moveDownNodes = (cells: Array<Cell>) => {
    cells.forEach((cell) => {
        cell.setZIndex(cell.zIndex as number-1)
    })
}
export const nodes2Top = (cells: Array<Cell>) => {
    // const {topZIndex} = getZIndexRange(cells)
    cells.forEach((cell)=>{
        cell.toFront()
    })
}

export const nodes2Bottom = (cells: Array<Cell>) => {
    cells.forEach((cell)=>{
        cell.toBack()
    })
}
// function getBoundary(cells:Array<Cell>){

// }