import { Outlet } from 'react-router-dom'

import { Header } from '~/components/header'

export function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  )
}
