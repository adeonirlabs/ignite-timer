import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { cn } from '~/utils/classnames'

const button = tv({
  base: 'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded m-4',
  variants: {
    variant: {
      primary: '',
      secondary: '',
      danger: '',
      success: '',
    },
  },
})

interface Props extends ComponentProps<'button'>, VariantProps<typeof button> {}

export function Button({ className, variant, ...props }: Props) {
  return (
    <button className={cn(button({ variant, className }))} {...props}>
      Button
    </button>
  )
}
