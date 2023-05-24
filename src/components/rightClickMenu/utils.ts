import { filterSeats } from "@/utils/others";
import type { Cell } from "@antv/x6";

// 两个座位交换
export const switch2Seats = (seats: Array<Cell>)=> {
    seats = filterSeats(seats)
    if (seats.length !== 2) {
        return false
    }

    const name1 = seats[0].getProp<string>("attrs")["name"]["text"]
    const name2 = seats[1].getProp<string>("attrs")["name"]["text"]

    seats[0].attr("name",{ text: name2})
    seats[1].attr("name",{ text: name1})

    return true
}
/**
 * 重新安排座位
 * @param cells 选中的元素
 * @param newIdDic 原来座位号和新座位号的对应map
 */
export const reArrangeSeatsIds = (cells: Array<Cell>,newIdDic: Map<string, string>) => {
    const seats = filterSeats(cells)
    newIdDic.forEach((value, key)=>{
        for (let index = 0; index < seats.length; index++) {
            const seat = seats[index];
            if(seat.getProp<string>("attrs")["seatKey"]["text"] === key){
                seat.attr("seatKey",{ text: value})
                break
            }
        }
    })
} 

export const setSeatsDisable = (cells: Array<Cell>)=>{
    const seats = filterSeats(cells)
    seats.forEach(seat => {
        seat.attr("body",{ stroke: "#909399"})
        seat.attr("name",{ fill: "#909399", text:'-'})
        seat.attr("seatKey",{ fill: "#909399"})
        seat.setData({disabled: true})
    })
}

export const setSeatsEnable = (cells: Array<Cell>)=>{
    const seats = filterSeats(cells)
    seats.forEach(seat => {
        seat.attr("body",{ stroke: "#5F95FF"})
        seat.attr("name",{ fill: "#5F95FF", text:'未安排'})
        seat.attr("seatKey",{ fill: "#5F95FF"})
        seat.setData({disabled: false})
    })
}