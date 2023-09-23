import type { ReactNode } from 'react'
import { createContext, useEffect, useReducer, useState } from 'react'

import {
  addCycleAction,
  cyclesReducer,
  deleteCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '~/reducers/cycles'
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
  deleteCycle: (id: string) => void
  handleSetFinished: () => void
  handleSetTimePassed: (value: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface Props {
  children: ReactNode
}

export function CyclesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storage = localStorage.getItem('@ignite-timer:cycles')
      return storage ? JSON.parse(storage) : initialState
    },
  )

  useEffect(() => {
    localStorage.setItem('@ignite-timer:cycles', JSON.stringify(state))
  }, [state])

  const { cycles, activeCycleId } = state

  const activeCycle = cycles && cycles.find((cycle) => cycle.id === activeCycleId)
  const totalTime = activeCycle ? activeCycle?.duration * 60 : 0

  const [timePassed, setTimePassed] = useState(() =>
    activeCycle ? new Date(activeCycle.startedAt).getTime() - new Date().getTime() : 0,
  )

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

  function deleteCycle(id: string) {
    dispatch(deleteCycleAction(id))
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
        deleteCycle,
        handleSetFinished,
        handleSetTimePassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
