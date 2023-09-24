import { zodResolver } from '@hookform/resolvers/zod'
import { Play, StopCircle } from 'lucide-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '~/components/button'
import { CyclesContext } from '~/context/cycles'

import { Countdown } from './components/countdown'
import { Form } from './components/form'

const schema = z.object({
  name: z.string().min(1, 'Task name is required'),
  duration: z.number().min(1).max(25, 'Duration must be between 1 and 25 minutes'),
})

type FormValues = z.infer<typeof schema>

export function Home() {
  const { activeCycle, createCycle, interruptCycle } = useContext(CyclesContext)

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = formMethods

  function handleCreate(data: FormValues) {
    createCycle(data)
    reset()
  }

  function handleInterrupt() {
    interruptCycle()
    reset()
  }

  return (
    <main className="flex flex-1">
      <div className="mx-auto flex max-w-[50rem] flex-1 flex-col gap-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {activeCycle ? activeCycle.name : 'Start a new timer'}
        </h1>

        <div className="mx-auto flex max-w-[50rem] flex-1 flex-col items-center justify-center gap-12">
          <FormProvider {...formMethods}>
            <Form id="timer" onSubmit={handleSubmit(handleCreate)} />
          </FormProvider>
          <Countdown />

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
      </div>
    </main>
  )
}
