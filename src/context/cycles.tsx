import type { ReactNode } from 'react'
import { createContext, useReducer, useState } from 'react'

interface FormData {
  name: string
  duration: number
}

export interface Cycle {
  id: string
  name: string
  duration: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CyclesContextData {
  activeCycle?: Cycle
  activeCycleId: string | null
  cycles: Cycle[]
  timePassed: number
  totalTime: number
  createCycle: (data: FormData) => void
  interruptCycle: () => void
  handleSetFinished: () => void
  handleSetTimePassed: (value: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface Props {
  children: ReactNode
}

export function CyclesProvider({ children }: Props) {
  const [timePassed, setTimePassed] = useState(0)
  const [reducer, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload],
            activeCycleId: action.payload.id,
          }
        case 'INTERRUPT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) =>
              cycle.id === state.activeCycleId ? { ...cycle, interruptedAt: new Date() } : cycle,
            ),
            activeCycleId: null,
          }
        case 'SET_FINISHED':
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
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = reducer

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalTime = activeCycle ? activeCycle?.duration * 60 : 0

  function createCycle(data: FormData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      name: data.name,
      duration: data.duration,
      startedAt: new Date(),
    }
    dispatch({ type: 'ADD_CYCLE', payload: newCycle })
    setTimePassed(0)
  }

  function interruptCycle() {
    dispatch({ type: 'INTERRUPT_CYCLE' })
  }

  function handleSetFinished() {
    dispatch({ type: 'SET_FINISHED' })
  }

  function handleSetTimePassed(value: number) {
    setTimePassed(value)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        timePassed,
        totalTime,
        createCycle,
        interruptCycle,
        handleSetFinished,
        handleSetTimePassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
