import { Status } from '~/components/status'
import { cn } from '~/utils/classnames'
import { toSentenceCase } from '~/utils/string'

const data = [
  {
    name: 'Make coffee',
    duration: 25,
    started: '30 minutes ago',
    status: 'progress',
  },
  {
    name: 'Walk the dog',
    duration: 45,
    started: '1 hour ago',
    status: 'done',
  },
  {
    name: 'Read a book',
    duration: 10,
    started: '15 minutes ago',
    status: 'failed',
  },
  {
    name: 'Do laundry',
    duration: 30,
    started: '45 minutes ago',
    status: 'progress',
  },
  {
    name: 'Cook dinner',
    duration: 55,
    started: '2 hours ago',
    status: 'done',
  },
  {
    name: 'Go for a run',
    duration: 20,
    started: '1 hour ago',
    status: 'failed',
  },
  {
    name: 'Clean the house',
    duration: 40,
    started: '1 hour ago',
    status: 'done',
  },
  {
    name: 'Write code',
    duration: 15,
    started: '30 minutes ago',
    status: 'progress',
  },
  {
    name: 'Water the plants',
    duration: 35,
    started: '45 minutes ago',
    status: 'done',
  },
  {
    name: 'Take a nap',
    duration: 50,
    started: '2 hours ago',
    status: 'progress',
  },
] as const

export function History() {
  const thStyles = 'border-b-4 border-zinc-800 bg-zinc-700 p-4 text-left text-sm text-zinc-100'
  const trStyles = 'border-b-4 border-zinc-800 bg-zinc-700/30 p-4 text-left text-sm text-zinc-100'

  return (
    <main className="flex flex-1 overflow-hidden">
      <div className="mx-auto flex max-w-[50rem] flex-1 flex-col gap-8">
        <h1 className="text-3xl font-bold text-zinc-100">History</h1>

        <div
          className={cn(
            'h-full w-full flex-1 overflow-auto',
            'scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-zinc-900/80 scrollbar-corner-zinc-700/50 scrollbar-track-zinc-700/50',
          )}
        >
          <table className="w-full min-w-[36rem] border-collapse">
            <thead>
              <tr>
                <th className={cn(thStyles, 'rounded-tl-lg pl-6')}>Task</th>
                <th className={cn(thStyles)}>Duration</th>
                <th className={cn(thStyles)}>Start</th>
                <th className={cn(thStyles, 'rounded-tr-lg pr-6')}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.name} className={cn(trStyles)}>
                  <td className={cn(trStyles, 'w-1/2 pl-6')}>{item.name}</td>
                  <td className={cn(trStyles)}>{item.duration} minutes</td>
                  <td className={cn(trStyles)}>{item.started}</td>
                  <td className={cn(trStyles, 'pr-6')}>
                    <Status variant={item.status}>{toSentenceCase(item.status)}</Status>
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
