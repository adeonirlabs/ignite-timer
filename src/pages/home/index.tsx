import { zodResolver } from '@hookform/resolvers/zod'
import { Play, StopCircle } from 'lucide-react'
import { createContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/button'

import { Countdown } from './components/countdown'
import { Form } from './components/form'

interface Cycle {
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
  timePassed: number
  totalTime: number
  handleSetFinished: () => void
  handleSetTimePassed: (value: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

const schema = z.object({
  name: z.string().min(1, 'Task name is required'),
  duration: z.number().multipleOf(5).min(5).max(60, 'Duration must be between 5 and 60 minutes'),
})

type FormValues = z.infer<typeof schema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [timePassed, setTimePassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalTime = activeCycle ? activeCycle?.duration * 60 : 0

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  function handleSetFinished() {
    setCycles((state) =>
      state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, finishedAt: new Date() } : cycle)),
    )
    setActiveCycleId(null)
    formMethods.reset()
  }

  function handleSetTimePassed(value: number) {
    setTimePassed(value)
  }

  function handleSubmit(data: FormValues) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      name: data.name,
      duration: data.duration,
      startedAt: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
  }

  function handleInterrupt() {
    setCycles((state) =>
      state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, interruptedAt: new Date() } : cycle)),
    )
    setActiveCycleId(null)
    setTimePassed(0)
    formMethods.reset()
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="mx-auto flex max-w-[50rem] flex-1 flex-col items-center justify-center gap-12">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            timePassed,
            totalTime,
            handleSetFinished,
            handleSetTimePassed,
          }}
        >
          <FormProvider {...formMethods}>
            <Form id="timer" onSubmit={formMethods.handleSubmit(handleSubmit)} />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <Button form="timer" type="button" variant="danger" onClick={handleInterrupt}>
            <StopCircle size={24} />
            Interrupt
          </Button>
        ) : (
          <Button form="timer" type="submit" variant="primary">
            <Play size={24} />
            Start
          </Button>
        )}
      </div>
    </main>
  )
}
