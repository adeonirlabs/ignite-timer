import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/button'
import { cn } from '~/utils/classnames'

const schema = z.object({
  task: z.string().min(1, 'Task name is required'),
  duration: z.number().multipleOf(5).min(5).max(60, 'Duration must be between 5 and 60 minutes'),
})

type FormValues = z.infer<typeof schema>

interface Cycle {
  id: string
  name: string
  duration: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  console.log(activeCycle)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormValues) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      name: data.task,
      duration: Number(data.duration),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="task">I will work on</label>
          <input
            {...register('task')}
            className={cn(inputStyles, 'input-list flex-1', { 'focus:ring-red-500': errors.task })}
            placeholder="Name your task"
            type="text"
            id="task"
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
            type="number"
            min={5}
            step={5}
          />
          <span>minutes</span>
        </form>

        <div className="flex w-full justify-between gap-4 font-mono text-10xl">
          <span className={counterStyles}>0</span>
          <span className={counterStyles}>0</span>
          <span className="text-blue-500">:</span>
          <span className={counterStyles}>0</span>
          <span className={counterStyles}>0</span>
        </div>

        <Button form="timer" type="submit" variant="primary">
          <Play size={24} />
          Start
        </Button>
      </div>
    </main>
  )
}
