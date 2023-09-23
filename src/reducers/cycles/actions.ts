import type { Cycle } from '~/types'

export enum CyclesActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  DELETE_CYCLE = 'DELETE_CYCLE',
}

export function addCycleAction(cycle: Cycle) {
  return { type: CyclesActionTypes.ADD_CYCLE, payload: cycle }
}

export function interruptCycleAction() {
  return { type: CyclesActionTypes.INTERRUPT_CYCLE }
}

export function finishCycleAction() {
  return { type: CyclesActionTypes.FINISH_CYCLE }
}

export function deleteCycleAction(id: string) {
  return { type: CyclesActionTypes.DELETE_CYCLE, payload: id }
}
