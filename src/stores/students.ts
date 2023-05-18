import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface StudentState {
  studentsExcel:Array<Array<string|number>>,
}
export const useStudentStore = defineStore('student',  {
  state:():StudentState=>({
    studentsExcel:[],
  }),
  getters: {
    canArrange: (state) => {
      if(state.studentsExcel.length < 2){
        return false
      }
      return true
    },
  },
  actions: {
     hasPreSeatStus(): Array<Array<string|number>> {
      // 返回有预排座位的学生
      const preOrderInArr = this.studentsExcel[0].indexOf('预排座位')
      const res = this.studentsExcel.filter((item)=>{
        if(item.length>=preOrderInArr && item[preOrderInArr]!=='预排座位'){
          return item
        }
      })
      return res
    },
    getHasNoPreSeatStus(): Array<Array<string|number>> {
      // 返回无预排座位的学生
      const preOrderInArr = this.studentsExcel[0].indexOf('预排座位')
      const res = this.studentsExcel.filter((item)=>{
        if(item.length>=preOrderInArr && !item[preOrderInArr]){
          return item
        }
        if(item.length < preOrderInArr+1)return item
      })
      return res
    }
  }
  
})
