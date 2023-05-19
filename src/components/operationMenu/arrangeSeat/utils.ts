import { useStudentStore } from '@/stores/students'
import { filterSeats } from '@/utils/others'
import type { Graph, Node } from '@antv/x6'
import {shuffle} from 'lodash'
import * as XLSX from 'xlsx'



export const includeSeat = (seat:Node, seats: Array<Node>):boolean=>{
    const seatKey = seat.id

    for (let index = 0; index < seats.length; index++) {
        if (seats[index].id === seatKey) {
            return true
        }
    }
    return false
}

// 编排座位的核心代码
export const arrangeSeat = (graph:Graph) => {
    const studentStore = useStudentStore()
    const allNodes:Array<Node> = graph.getNodes()
        console.log("allNodes",allNodes);
        
    let seats = filterSeats(allNodes)

    seats.forEach((seat)=>{
        seat.attr("name",{ text: '未安排'})
    })

    const firstStus = JSON.parse(JSON.stringify(studentStore.hasPreSeatStus()))
    const arrangedSeat:Array<Node> = []
    
    seats.forEach((seat)=>{
        // 默认预排座位在第二个位置
        let stu = firstStus.shift();
        if(!stu)return
        const seatKey = stu[1]
        if (seat.getProp<string>("attrs")["seatKey"]["text"] === seatKey) {
            seat.attr("name",{ text: stu[0]})
            arrangedSeat.push(seat)
            return
        }  
    })
    
    const otherStus = shuffle(JSON.parse(JSON.stringify(studentStore.getHasNoPreSeatStus())))
    // console.log(seats[0]);

    console.log("otherStus[0]",otherStus[0]);
    seats = shuffle(seats)
    seats.forEach((seat)=>{
        let stu = otherStus.shift();
        if (!includeSeat(seat, arrangedSeat) && stu) {
            seat.attr("name",{ text: stu[0]})
            arrangedSeat.push(seat)
            return
        }  
    })
    // otherStus.forEach((stu)=>{
    //     // const seatKey = stu[1]
    //     console.log(stu);
        
        
    // })
    console.log("arrangedSeat",arrangedSeat);
    seats.forEach((seat)=>{
        if (seat.getProp<string>("attrs")["name"]["text"] === "未安排") {
            seat.attr("name",{ text: ''})
        }
    })

}

export const readXlsx = (file: File, callBack=()=>{}) => {
    const reader = new FileReader()
    
    const studentStore = useStudentStore()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result instanceof ArrayBuffer) {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })

          const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 }) as Array<
            Array<number | string>
          >

          studentStore.studentsExcel = jsonData
        //   console.log(studentStore.hasPreSeatStus())
        //   console.log(studentStore.studentsExcel)
            // callBack()
        }
      }

      reader.readAsArrayBuffer(file)
}