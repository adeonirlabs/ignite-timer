import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

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

interface Props {
  children: ReactNode
}

export function CyclesProvider({ children }: Props) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [timePassed, setTimePassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalTime = activeCycle ? activeCycle?.duration * 60 : 0

  function createCycle(data: FormData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      name: data.name,
      duration: data.duration,
      startedAt: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, interruptedAt: new Date() } : cycle)),
    )
    setActiveCycleId(null)
    setTimePassed(0)
  }

  function handleSetFinished() {
    setCycles((state) =>
      state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, finishedAt: new Date() } : cycle)),
    )
    setActiveCycleId(null)
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
