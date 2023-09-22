import { type ComponentProps, useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '~/utils/classnames'

import { CyclesContext } from '..'

interface Props extends ComponentProps<'form'> {}

export function Form({ ...props }: Props) {
  const { activeCycle } = useContext(CyclesContext)

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputStyles = [
    'rounded-lg bg-zinc-700/40 px-3 py-2 font-bold tracking-wide text-zinc-100',
    'placeholder-zinc-500 transition focus:ring-2 focus:ring-blue-500',
  ]

  return (
    <form className="flex w-full flex-wrap items-center justify-center gap-2 text-lg text-zinc-300" {...props}>
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
  )
}
