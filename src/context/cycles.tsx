import type { ReactNode } from 'react'
import { createContext, useReducer, useState } from 'react'

import { addCycleAction, cyclesReducer, finishCycleAction, interruptCycleAction } from '~/reducers/cycles'
import type { Cycle } from '~/types'

interface FormData {
  name: string
  duration: number
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

interface Props {
  children: ReactNode
}

export function CyclesProvider({ children }: Props) {
  const [timePassed, setTimePassed] = useState(0)
  const [reducer, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

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
    dispatch(addCycleAction(newCycle))
    setTimePassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function handleSetFinished() {
    dispatch(finishCycleAction())
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
