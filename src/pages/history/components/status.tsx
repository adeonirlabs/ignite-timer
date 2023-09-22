import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { cn } from '~/utils/classnames'

const status = tv({
  base: 'flex items-center gap-2 before:h-2 before:w-2 before:rounded-full',
  variants: {
    variant: {
      inProgress: 'before:bg-yellow-500',
      finished: 'before:bg-green-500',
      interrupted: 'before:bg-red-500',
    },
  },
})

interface Props extends ComponentProps<'div'>, VariantProps<typeof status> {}

export function Status({ className, variant, ...props }: Props) {
  return <div className={cn(status({ variant, className }))} {...props} />
}
