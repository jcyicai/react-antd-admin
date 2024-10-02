import { MutableRefObject } from 'react'
import { User } from './api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp<T> {
  mRef: MutableRefObject<
    | {
        open: (type: IAction, data?: T) => void
      }
    | undefined
  >
  update: () => void
}

export interface IDetailProp {
  mRef: MutableRefObject<
    | {
        open: (id: string) => void
      }
    | undefined
  >
}
