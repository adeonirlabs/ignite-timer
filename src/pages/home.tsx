import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Play, StopCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/button'
import { cn } from '~/utils/classnames'

const schema = z.object({
  name: z.string().min(1, 'Task name is required'),
  duration: z.number().multipleOf(5).min(5).max(60, 'Duration must be between 5 and 60 minutes'),
})

type FormValues = z.infer<typeof schema>

interface Cycle {
  id: string
  name: string
  duration: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [counter, setCounter] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalTime = activeCycle ? activeCycle?.duration * 60 : 0
  const currentTime = activeCycle ? totalTime - counter : 0

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0')
  const seconds = String(currentTime % 60).padStart(2, '0')

  const {
    register,
    handleSubmit: handleSubmitForm,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

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
    setCounter(0)
    reset()
  }

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const timePassed = differenceInSeconds(new Date(), activeCycle.startedAt)
        if (timePassed >= totalTime) {
          setCycles((state) =>
            state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, finishedAt: new Date() } : cycle)),
          )
          setActiveCycleId(null)
          setCounter(0)
          reset()
        } else {
          setCounter(timePassed)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, reset, totalTime])

  useEffect(() => {
    document.title = activeCycle ? `Timer | ${minutes}:${seconds}` : 'Timer'
  }, [activeCycle, minutes, seconds])

  const inputStyles = [
    'rounded-lg bg-zinc-700/40 px-3 py-2 font-bold tracking-wide text-zinc-100',
    'placeholder-zinc-500 transition focus:ring-2 focus:ring-blue-500',
  ]
  const counterStyles = 'rounded-lg bg-zinc-700/40 px-8 py-1'

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="mx-auto flex max-w-[50rem] flex-1 flex-col items-center justify-center gap-12">
        <form
          id="timer"
          className="flex w-full flex-wrap items-center justify-center gap-2 text-lg text-zinc-300"
          onSubmit={handleSubmitForm(handleSubmit)}
        >
          <label htmlFor="name">I will work on</label>
          <input
            {...register('name')}
            className={cn(inputStyles, 'input-list flex-1', { 'focus:ring-red-500': errors.name })}
            placeholder="Name your task"
            disabled={!!activeCycle}
            type="text"
            list="tasks-list"
          />
          <datalist id="tasks-list">
            <option value="Task 1" />
            <option value="Task 2" />
            <option value="Task 3" />
          </datalist>
          <label htmlFor="duration">during</label>
          <input
            {...register('duration', { valueAsNumber: true })}
            className={cn(inputStyles, 'w-20', { 'focus:ring-red-500': errors.duration })}
            placeholder="25"
            disabled={!!activeCycle}
            type="number"
            min={5}
            step={5}
          />
          <span>minutes</span>
        </form>

        <div className="flex w-full justify-between gap-4 font-mono text-10xl">
          <span className={counterStyles}>{minutes[0]}</span>
          <span className={counterStyles}>{minutes[1]}</span>
          <span className="text-blue-500">:</span>
          <span className={counterStyles}>{seconds[0]}</span>
          <span className={counterStyles}>{seconds[1]}</span>
        </div>

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
