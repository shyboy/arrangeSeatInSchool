import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface OtherState {
    showReArrangeDialog:boolean,
}
export const useOthersStore = defineStore('others',  {
  state:():OtherState=>({
    showReArrangeDialog:false,
  })
  
})
