import type { Cell } from "@antv/x6";

export const filterSeats = (nodes: Array<Cell>):Array<Cell> => {
    return nodes.filter((node)=>{
        const attrs = node.getAttrs()
        if (attrs?.seatKey) {
            return node
        }
    })
}