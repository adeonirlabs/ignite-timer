import { ScrollText, Timer } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Logo } from '~/components/logo'
import { cn } from '~/utils/classnames'

export function Header() {
  const navLink = cn(
    'flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-blue-500',
    'border-y-2 border-transparent hover:border-b-blue-500',
    'aria-[current=page]:text-blue-500 transition',
  )

  return (
    <header className="flex items-center justify-between">
      <Logo className="h-10 w-10 text-blue-500" />
      <nav className="flex items-center gap-4">
        <NavLink to="/" className={navLink} title="Home">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" className={navLink} title="History">
          <ScrollText size={24} />
        </NavLink>
      </nav>
    </header>
  )
}
