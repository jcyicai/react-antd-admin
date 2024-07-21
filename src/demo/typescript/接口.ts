interface Person {
  name: string
  age: number
}

const jc: Person = {
  name: 'jc',
  age: 18
}

// 接口不存在该变量
const tom: Person = {
  name: 'tom',
  gender: 'male'
}

interface P {
  readonly name: string
  age?: number // 可选属性
  [k: string]: any // 任意属性
}

const lily: P = {
  name: 'Lily'
}

// 只读属性不能修改
lily.name = 'jk'

const jk: P = {
  name: 'Jack',
  id: 1
}

// 定义函数接口
interface Sum {
  (x: number, y: number): number
}

const add: Sum = (x, y) => {
  return x + y
}

type Sum2 = (x: number, y: number) => number

// 接口继承
interface User {
  id: number
  name: string
}

interface Person extends User {
  age: number
}

const Tom1: Person = {
  id: 1,
  name: 'tom',
  age: 18
}

type Person1 = User & { age: number }

// 接口和 Type 区别
// 接口通过interface定义， type是用来定义类型别名
// 接口可以重复定义，type不可以
// 接口可以继承，type不可以继承，但是可以通过联合类型和交叉类型来模拟继承
