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

// function getBoundary(cells:Array<Cell>){

// }