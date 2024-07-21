// 元组
const list1: [number, string, boolean] = [1, '2', true]
// 解构
const user1: [number, string] = [1, 'jc']
const [id1, name1] = user1

// 可选类型 第三个值不一定存在
const list2: [number, number, number?] = [1, 2, 3]
const list3: [number, number, number?] = [1, 2]

// 交叉类型
// 把多个类型合并为一个类型
const id: number | string = 1

type UserType = { id: number; name: string }
type AgeType = { age: number }

const user2: UserType & AgeType = { id: 1, name: 'jc', age: 18 }
