import { cn } from '~/utils/classnames'

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
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className={cn(trStyles, 'w-1/2 pl-6')}>Task 1</td>
                  <td className={cn(trStyles)}>25 minutes</td>
                  <td className={cn(trStyles)}>30 minutes ago</td>
                  <td className={cn(trStyles, 'pr-6')}>Done</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
