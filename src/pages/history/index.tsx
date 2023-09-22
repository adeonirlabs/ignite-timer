import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'

import type { Cycle } from '~/context/cycles'
import { CyclesContext } from '~/context/cycles'
import { cn } from '~/utils/classnames'

import { Status } from './components/status'

export function History() {
  const { cycles } = useContext(CyclesContext)

  const displayStatus = (cycle: Cycle) => {
    if (cycle.finishedAt) return <Status variant="finished">Finished</Status>
    if (cycle.interruptedAt) return <Status variant="interrupted">Interrupted</Status>
    return <Status variant="inProgress">In progress</Status>
  }

  const thStyles = 'border-b-4 border-zinc-800 bg-zinc-700 p-4 text-left text-sm text-zinc-100'
  const trStyles = 'border-b-4 border-zinc-800 bg-zinc-700/30 p-4 text-left text-sm text-zinc-100'

  return (
    <main className="flex flex-1 overflow-hidden">
      <div className="mx-auto flex max-w-[50rem] flex-1 flex-col gap-8">
        <h1 className="text-3xl font-bold text-zinc-100">History</h1>

        <div
          className={cn(
            'h-full w-full flex-1 overflow-auto',
            'scrollbar-rounded-lg scrollbar-thin scrollbar-track-zinc-700/50 scrollbar-thumb-zinc-900/80 scrollbar-corner-zinc-700/50',
          )}
        >
          <table className="w-full min-w-[36rem] border-collapse">
            <thead>
              <tr>
                <th className={cn(thStyles, 'rounded-tl-lg pl-6')}>Task</th>
                <th className={thStyles}>Duration</th>
                <th className={thStyles}>Start</th>
                <th className={cn(thStyles, 'rounded-tr-lg pr-6')}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => (
                <tr key={cycle.id} className={trStyles}>
                  <td className={cn(trStyles, 'w-1/2 pl-6')}>{cycle.name}</td>
                  <td className={trStyles}>{cycle.duration} minutes</td>
                  <td className={trStyles}>{formatDistanceToNow(cycle.startedAt, { addSuffix: true })}</td>
                  <td className={cn(trStyles, 'pr-6')}>{displayStatus(cycle)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
