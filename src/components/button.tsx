import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { cn } from '~/utils/classnames'

const button = tv({
  base: [
    'inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-6',
    'font-bold text-zinc-100 transition disabled:opacity-70 disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      primary: 'bg-blue-500 enabled:hover:bg-blue-600',
      danger: 'bg-red-500 enabled:hover:bg-red-600',
    },
  },
})

interface Props extends ComponentProps<'button'>, VariantProps<typeof button> {}

export function Button({ className, variant, ...props }: Props) {
  return <button className={cn(button({ variant, className }))} {...props} />
}
