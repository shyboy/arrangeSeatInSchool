import type { Cell, Graph } from '@antv/x6'

// 定义矩阵的类型：一个对象，其中键是组名，值是坐标数组
type Matrix = { [key: string]: { x: number; y: number }[] }

// generateMatrix函数
export function generateMatrix(
  lines: number, // 列数
  rows: number, // 行数
  groupLines: number, // 组内列数
  groupRows: number, // 组内行数
  groupMargin: number, // 组间间距
  margin: {x:number,y:number} // 组内间距
): { matrix: Matrix; groupCount: number } {
  // 参数校验
//   if (
//     !Number.isInteger(lines) ||
//     !Number.isInteger(rows) ||
//     !Number.isInteger(groupLines) ||
//     !Number.isInteger(groupRows)  ||
//     !Number.isInteger(margin) ||
//     lines < 1 ||
//     lines > 1000 ||
//     rows < 1 ||
//     rows > 1000 ||
//     groupLines < 0 ||
//     groupLines > 100 ||
//     groupRows < 0 ||
//     groupRows > 100 ||
//     groupMargin < 1 ||
//     groupMargin > 1000 ||
//     margin.x < 1 ||
//     margin.x > 1000
//   ) {
//     throw new Error('Invalid arguments')
//   }

  // 定义了一个矩阵，其中键为组名，值为坐标数组
  const matrix: Matrix = {}

  // 定义组索引变量，用于生成组名
  let groupIndex = 0

  // 计算x轴和y轴方向的组数
  let groupCountX = groupLines ? Math.ceil(lines / groupLines) : 1
  let groupCountY = groupRows ? Math.ceil(rows / groupRows) : 1

  // 通过两层循环来生成每个组的坐标
  for (let gx = 0; gx < groupCountX; gx++) {
    for (let gy = 0; gy < groupCountY; gy++) {
      // 生成组名，并在矩阵中创建该组
      let groupName = String.fromCharCode(65 + groupIndex)
      matrix[groupName] = []

      // 计算该组的起始坐标和结束坐标
      let startX = gx * groupLines
      let startY = gy * groupRows
      let endX = groupLines ? Math.min((gx + 1) * groupLines, lines) : lines
      let endY = groupRows ? Math.min((gy + 1) * groupRows, rows) : rows

      // 通过两层循环来生成该组内的每个坐标
      for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
          // 计算x和y坐标，并将其添加到该组中
          let x = j * margin.x + gx * groupMargin
          let y = i * margin.y + gy * groupMargin
          matrix[groupName].push({ x, y })
        }
      }

      // 组索引加1
      groupIndex++
    }
  }

  // 计算组的数量
  let groupCount = groupIndex

  // 返回矩阵和组的数量
  return { matrix, groupCount }
}

export const generateSeats = (
  graph: Graph,
  batchParams: {
    lines: number
    rows: number
    groupLines: number
    groupRows: number
  },
  seat: Cell,
  margin: number = 20
) => {

    const {width, height} = seat.getProp<{ width: number, height: number }>("size");
    const marginX = width + margin
    const marginY = height + margin

    const groupMargin = 2*margin

    const newMargin = {
        x: marginX,
        y: marginY
    }

    const res = generateMatrix(batchParams.lines, batchParams.rows, batchParams.groupLines, batchParams.groupRows,groupMargin, newMargin)

    console.log(res);

    const matrix = res.matrix

    Object.keys(matrix).forEach(GroupKey => {
        matrix[GroupKey].forEach((coordinate, index)=>{
            const seatKey = GroupKey + (index+1).toString()
            graph.addNode({
                x: coordinate.x,
                y: coordinate.y,
                shape: 'seat-node',
                attrs: {
                  seatKey: {
                    text: seatKey,
                    wordSpacing: '-5px',
                    letterSpacing: 0
                  },
                  name: {
                    text: "未安排",
                    fontSize: 16,
                    // fontFamily: 'Arial',
                    letterSpacing: 0
                  }
                }
              })
        })
    });
    graph.centerContent() // 居中显示
}
