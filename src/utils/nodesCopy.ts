import type { Cell, Graph } from "@antv/x6";

export const deleteNodes = (graph:Graph, cells: Array<Cell>) => {
    if (cells.length) {
    graph.removeCells(cells)
    }
}