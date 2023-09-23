import { formatDistanceToNow } from 'date-fns'
import { Trash } from 'lucide-react'
import { useContext } from 'react'

import { CyclesContext } from '~/context/cycles'
import type { Cycle } from '~/types'
import { cn } from '~/utils/classnames'

import { Status } from './components/status'

export function History() {
  const { cycles, deleteCycle } = useContext(CyclesContext)

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
                <th className={thStyles}>Status</th>
                <th className={cn(thStyles, 'rounded-tr-lg pr-4')} />
              </tr>
            </thead>
            <tbody>
              {cycles &&
                cycles.map((cycle) => (
                  <tr key={cycle.id} className={trStyles}>
                    <td className={cn(trStyles, 'w-2/5 pl-6')}>{cycle.name}</td>
                    <td className={trStyles}>{cycle.duration} minutes</td>
                    <td className={trStyles}>{formatDistanceToNow(new Date(cycle.startedAt), { addSuffix: true })}</td>
                    <td className={trStyles}>{displayStatus(cycle)}</td>
                    <td className={cn(trStyles, 'pr-4')}>
                      <button
                        className="appearance-none text-zinc-400 transition hover:text-blue-300"
                        type="button"
                        onClick={() => deleteCycle(cycle.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
