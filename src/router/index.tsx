import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '~/layouts/default'
import { History } from '~/pages/history'
import { Home } from '~/pages/home'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
])
