import { Outlet } from 'react-router-dom'

import { Header } from '~/components/header'

export function Layout() {
  return (
    <div className="flex h-full items-center justify-center p-20">
      <section className="mx-auto flex h-full w-full max-w-6xl flex-col rounded-lg bg-zinc-800 p-10">
        <Header />
        <Outlet />
      </section>
    </div>
  )
}
