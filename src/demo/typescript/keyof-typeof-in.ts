// keyof
// js 中获取 key 语法：Object.keys()
// ts 中获取 key 类型：keyof
interface Person {
  id: number
  name: string
}
type K1 = keyof Person // 'id' | 'name'

// typeof
// 获取对象类型
const jc: Person = { id: 1, name: 'jc' }

type User = typeof jc // Person
const Tom: User = { id: 2, name: 'tom' }

// in
// 遍历枚举类型
// 只能在 type 中使用，不能在 interface 中使用
type keys = 'id' | 'name'
type User1 = {
  [k in keys]: any
}
