import type { Cycle } from '~/types'

import { CyclesActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: { type: CyclesActionTypes; payload: Cycle }) {
  switch (action.type) {
    case CyclesActionTypes.ADD_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        activeCycleId: action.payload.id,
      }
    case CyclesActionTypes.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId ? { ...cycle, interruptedAt: new Date() } : cycle,
        ),
        activeCycleId: null,
      }
    case CyclesActionTypes.FINISH_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId ? { ...cycle, finishedAt: new Date() } : cycle,
        ),
        activeCycleId: null,
      }
    default:
      return state
  }
}
