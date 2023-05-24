<template>
  <el-dialog v-model="otherStore.showReArrangeDialog"  title="重新安排座位">
    <el-form :model="form">
      <el-form-item v-for="item in form?.seats" :label="item.seatKey +' -> '">
        <el-input v-model="item.newSeatKey" placeholder="请输入修改后的座位号，不输入则不变" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { filterSeats } from '@/utils/others'
import type { Graph,Node } from '@antv/x6'
import { ref, onMounted, type Ref } from 'vue'
import { inject } from '@vue/runtime-core'
import { reArrangeSeatsIds } from '@/components/rightClickMenu/utils'
import { useOthersStore } from '@/stores/others'

interface Props {
  graph: Graph
}

// const showDialog = ref(false)

const props = defineProps<Props>()
const otherStore = useOthersStore()

const handleClose = () => {
  // showDialog.value = false
  otherStore.showReArrangeDialog = false
  // emits("update:modelValue",false)
}
const handleConfirm = () => {
  // todo 重新安排座位号码
  const cells = props.graph.getSelectedCells()
  const newIdDic = new Map<string,string>()
  console.log(cells);
  
  form.value.seats.forEach((seat)=>{
    newIdDic.set(seat.seatKey, seat.newSeatKey)
  })
  reArrangeSeatsIds(cells, newIdDic)

  handleClose()
}

const form = ref<{
  seats: Array<{ seatKey: string; newSeatKey: string }>
}>({seats:[]})
// computed(props.modelValue, ()=>{
  
// })

onMounted(() => {
  // if (props.modelValue) {
  //   showDialog.value = true
  // }else{
  //   showDialog.value = false
  // }
  const cells = props.graph.getSelectedCells()
  const seats = filterSeats(cells)
  const seatForms = new Array()
  seats.forEach((seat:Node)=>{
    const k = seat.getProp<string>("attrs")["seatKey"]["text"]
    seatForms.push({
      seatKey: k,
      newSeatKey: k
    })
  })
  form.value.seats = seatForms
})

</script>

<style scoped></style>
