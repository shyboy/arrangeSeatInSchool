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