import { Outlet } from 'react-router-dom'

import { Header } from '~/components/header'

export function Layout() {
  return (
    <div className="flex h-full items-center justify-center p-20">
      <section className="mx-auto flex h-full w-full max-w-7xl flex-col gap-16 rounded-lg bg-zinc-100 p-10 dark:bg-zinc-800">
        <Header />
        <Outlet />
      </section>
    </div>
  )
}
