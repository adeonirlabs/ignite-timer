import { produce } from 'immer'

import type { Cycle } from '~/types'

import { CyclesActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: { type: CyclesActionTypes; payload?: Cycle }) {
  switch (action.type) {
    case CyclesActionTypes.ADD_CYCLE:
      return produce(state, (draft) => {
        if (!action.payload) return
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case CyclesActionTypes.INTERRUPT_CYCLE:
      return produce(state, (draft) => {
        const index = draft.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
        if (index < 0) return
        draft.cycles[index].interruptedAt = new Date()
        draft.activeCycleId = null
      })
    case CyclesActionTypes.FINISH_CYCLE:
      return produce(state, (draft) => {
        const index = draft.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
        if (index < 0) return
        draft.cycles[index].finishedAt = new Date()
        draft.activeCycleId = null
      })
    default:
      return state
  }
}
