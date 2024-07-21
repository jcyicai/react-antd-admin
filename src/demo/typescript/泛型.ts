// 在编译期间不确定变量的类型，在调用时，由开发者指定具体的类型
function identity<T>(arg: T): T {
  return arg
}

identity<number>(1)
identity<string>('jc')

// 多类型传递
function identity1<T, U>(x: T, y: U): T {
  return x
}

identity1<number, number>(1, 2)
identity1<string, number>('jc', 1)

// Pick 类型
// Pick 意思为挑选，可以从已有的类型中，挑选一些类型进行使用
interface User {
  id: number
  name: string
  age: number
}

type AgeType = Pick<User, 'age' | 'name'>

const jc: AgeType = {
  name: 'jc',
  age: 18
}
