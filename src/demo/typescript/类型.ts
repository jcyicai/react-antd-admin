// 类型
const name: string = 'Jason'
const age: number = 30
const isTrue: boolean = true
const a: undefined
const b: null = null
const user: object = {}
const big: bigint = 100n
const sym: symbol = Symbol('jc')

// void never any unknown
// void 类型
// void 表示没有任何类型，不能直接赋值
let a1: void
const b1: number = a1
// 如果函数没有返回值，可以定义未 void
function fn(): void {
  console.log('jc')
}

// never 表示永不存在的值的类型
function error(): never {
  throw new Error('xxx')
}

function loop(): never {
  while (true) {
    console.log('xxx')
  }
}

// any 表示任意类型 不推荐使用
let num: any = 1000
num = 'jc'

// unknown 与 any 一样，所有类型都可以分配给 unknow
// 反之把 unknown 赋值给其他类型会报错

// unknown 可以接收任意类型
const name1: string = 'jc'
const user1: unknown = name1
// unknow 不可以赋值给其他类型，any除外，下面报错
const name2: unknown = 'jc'
const user2: string = name2 // 由于为 string 不能把不确定的类型进行赋值

// 能确定类型的，尽量定义类型
// 无法确定类型的，可以使用 any 进行兜底
// 当函数没有返回值时，可以使用 void 定义
// any 和 unknown 可以接收任意类型值，any 可以赋值给任意类型，但 unknown 不可以赋值给任意类型
// void 和 any 在项目中比较常见， never 和 unknown 不常用
