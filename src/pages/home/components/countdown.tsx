import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '~/context/cycles'

export function Countdown() {
  const { activeCycle, timePassed, totalTime, handleSetFinished, handleSetTimePassed } = useContext(CyclesContext)

  const currentTime = activeCycle ? totalTime - timePassed : 0

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0')
  const seconds = String(currentTime % 60).padStart(2, '0')

  const counterStyles = 'rounded-lg bg-zinc-700/40 px-8 py-1'

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const timePassed = differenceInSeconds(new Date(), new Date(activeCycle.startedAt))
        if (timePassed >= totalTime) {
          handleSetFinished()
          handleSetTimePassed(0)
        } else {
          handleSetTimePassed(timePassed)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeCycle, handleSetFinished, handleSetTimePassed, totalTime])

  useEffect(() => {
    document.title = activeCycle ? `Timer | ${minutes}:${seconds}` : 'Timer'
  }, [activeCycle, minutes, seconds])

  return (
    <div className="flex w-full justify-between gap-4 font-mono text-10xl">
      <span className={counterStyles}>{minutes[0]}</span>
      <span className={counterStyles}>{minutes[1]}</span>
      <span className="text-blue-500">:</span>
      <span className={counterStyles}>{seconds[0]}</span>
      <span className={counterStyles}>{seconds[1]}</span>
    </div>
  )
}
