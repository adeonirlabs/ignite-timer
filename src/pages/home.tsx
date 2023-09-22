import { Play } from 'lucide-react'

import { Button } from '~/components/button'
import { cn } from '~/utils/classnames'

export function Home() {
  const inputStyles = [
    'rounded-lg bg-zinc-700/40 px-3 py-2 font-bold tracking-wide text-zinc-100',
    'placeholder-zinc-500 transition focus:ring-2 focus:ring-blue-500',
  ]
  const counterStyles = 'rounded-lg bg-zinc-700/40 px-8 py-1'

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex max-w-[50rem] flex-1 flex-col items-center justify-center gap-12">
        <form id="timer" className="flex w-full flex-wrap items-center justify-center gap-2 text-lg text-zinc-300">
          <label htmlFor="task">I will work on</label>
          <input
            className={cn(inputStyles, 'input-list flex-1')}
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
          <label htmlFor="amount">during</label>
          <input
            className={cn(inputStyles, 'w-20')}
            placeholder="25"
            type="number"
            id="amount"
            min={5}
            max={60}
            step={5}
          />
          <span>minutes</span>
        </form>

        <div className="text-10xl flex w-full justify-between gap-4 font-mono">
          <span className={counterStyles}>0</span>
          <span className={counterStyles}>0</span>
          <span className="text-blue-500">:</span>
          <span className={counterStyles}>0</span>
          <span className={counterStyles}>0</span>
        </div>

        <Button form="timer" type="submit" variant="primary" disabled>
          <Play size={24} />
          Start
        </Button>
      </div>
    </main>
  )
}
